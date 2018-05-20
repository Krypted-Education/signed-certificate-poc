(function(Vue) {
  var register = new Vue({
    el: '#registration',
    data: {
      name: '',
      lastname: '',
      isLoading: false,
      hash: '',
      isError: false
    },
    methods: {
      error: function(err) {
        this.isError = true;
        console.log(err);
      },
      save: function(event) {
        this.hash = false;
        this.isLoading = true;
        this.isError = false;

        var form = {
          name: this.name,
          lastname: this.lastname
        };

        this.$http
          .post('/api/create/certificate', form)
          .then(function(response) {
            this.isLoading = false;
            if (response && response.body.hash) {
              if (response.body.hash.indexOf('<head>') > 0) {
                return this.error(response);
              }
              this.hash = response.body.hash;
            } else {
              this.error(response);
            }
          }, function(err) {
            this.isLoading = false;
            this.error(error);
          });
      }
    }
  });
})(Vue);