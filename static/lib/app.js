(function(Vue) {
  var web3js;
  if (typeof window.web3 !== 'undefined') {
    web3js = new Web3(window.web3.currentProvider);
  } else {
    web3js = undefined;
  }

  var register = new Vue({
    el: '#registration',
    data: {
      name: '',
      lastname: '',
      grade: '',
      studentNumber: '',
      universityName: '',
      item_title: '',
      item_grade: '',
      items: [],
      isLoading: false,
      hash: '',
      isError: false,
      message: false
    },
    methods: {
      error: function(err) {
        this.isLoading = false;
        this.isError = true;
        if (typeof err === 'string') {
          this.message = err;
          this.isError = true;
        }
        console.log(err);
      },
      save: function(event) {
        this.hash = false;
        this.isLoading = true;
        this.isError = false;
        this.message = false;

        var form = {
          name: this.name,
          lastname: this.lastname,
          grade: this.grade,
          studentNumber: this.studentNumber,
          universityName: this.universityName,
          items: this.items
        };

        if (typeof web3js !== 'undefined') {
          var currentAddress = web3js.eth.accounts[0];
          if (typeof currentAddress === 'undefined') {
            return this.error('Please unlock your Metamask and try again.');
          }
          form.issuer = currentAddress;

          var messageToSign = web3js.toHex(JSON.stringify(form)),
            that = this;

          web3js.personal.sign(messageToSign, currentAddress, function(err, result) {
            if (err) {
              return that.error(err);
            }
            if (result) {
              form.issuerSignature = result;
            }

            that.$http
              .post('/api/create/certificate', form)
              .then(function(response) {
                that.isLoading = false;
                if (response && response.body.hash) {
                  if (response.body.hash.indexOf('<head>') > 0) {
                    return that.error(response);
                  }
                  that.hash = response.body.hash;
                } else {
                  that.error(response);
                }
              }, function(err) {
                that.isLoading = false;
                that.error(err);
              });
          });
        } else {
          that.error('I need Metamask to be installed in your browser.');
        }
      },
      createNewItem: function(event) {
        var form = document.querySelector('dialog');
        if (!form.showModal) {
          dialogPolyfill.registerDialog(form);
        }
        form.showModal();
      },
      deleteItem: function(item) {
        var items_list = this.items;
        this.items.forEach(function(current, index) {
          if (current.title == item.title) {
            items_list.splice(index, 1);
            return false;
          }
        });
      },
      saveDialog: function() {
        this.items.push({
          title: this.item_title,
          grade: this.item_grade
        });
        this.item_title = this.item_grade = undefined;
        this.closeDialog();
      },
      closeDialog: function() {
        var form = document.querySelector('dialog');
        form.close();
      }
    }
  });

  var view = new Vue({
    el: '#diploma-view',
    data: {
      proofOfDate: '23.02.1985',
      fullName: 'Fatma Ayseli',
      gpa: '3.21',
      items: [
        { title: 'Maths', grade: 'AA' },
        { title: 'Physics', grade: 'BA' },
        { title: 'English', grade: 'CC' },
        { title: 'History', grade: 'AA' }
      ]
    },
    methods: {

    }
  });
})(Vue);