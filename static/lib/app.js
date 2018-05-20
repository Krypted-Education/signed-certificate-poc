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
          lastname: this.lastname
        };

        if (typeof web3js !== 'undefined') {
          var currentAddress = web3js.eth.accounts[0];
          if (typeof currentAddress === 'undefined') {
            return this.error('Lutfen metamask uzerinden parolanizi girip tekrar deneyin');
          }
          var messageToSign = web3js.toHex('My name is ' + form.name + ' ' + form.lastname),
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
          that.error('Metamask kurulu olmali. Yoksa calismaz.');
        }
      }
    }
  });
})(Vue);