(function(Vue, moment, document, window) {
  var web3js;
  if (typeof window.web3 !== 'undefined') {
    web3js = new Web3(window.web3.currentProvider);
  } else {
    web3js = undefined;
  }

  function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
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
      getSignatureMessage: function(issuer) {
        return 'I, ' + issuer + ', signing this diploma as the issuer';
      },
      save: function(event) {
        this.hash = false;
        this.isLoading = true;
        this.isError = false;
        this.message = false;

        var form = {
          name: this.name,
          lastname: this.lastname,
          date: Date.now(),
          items: this.items,
          grade: this.grade,
          studentNumber: this.studentNumber,
          universityName: this.universityName,
        };

        if (typeof web3js !== 'undefined') {
          var currentAddress = web3js.eth.accounts[0];
          if (typeof currentAddress === 'undefined') {
            return this.error('Please unlock your Metamask and try again.');
          }
          form.issuer = currentAddress;
          form.issuerAuthority = getParameterByName('issuer');

          var messageToSign = web3js.toHex(this.getSignatureMessage(form.issuerAuthority)),
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
      proofOfDate: '',
      fullName: '',
      certificateId: '',
      gpa: '',
      issuer: '',
      issuerAuthority: '',
      signature: '',
      items: []
    },
    methods: {
      initialise: function() {
        var qrCode = document.getElementById('qr-code');
        if (!qrCode) {
          return;
        }
        this.certificateId = getParameterByName('certificate');
        qrCode.src = 'https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=http://poc-1.educha.in/view?certificate=' + this.certificateId;
        var that = this;
        this.$http.get('/api/get-diploma/' + this.certificateId).then(function(result) {
          if (!result || !result.body) {
            return;
          }
          that.proofOfDate = moment(result.body.date).format('MMM Do YYYY');
          that.issuer = result.body.issuer;
          that.issuerAuthority = result.body.issuerAuthority;
          that.signature = result.body.issuerSignature;
          that.fullName = result.body.name + ' ' + result.body.surname;
          that.gpa = result.body.grade;
          that.items = result.body.items;
        });
      }
    }
  });
  view.initialise();
})(Vue, moment, document, window);