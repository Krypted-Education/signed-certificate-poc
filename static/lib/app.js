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
      error: function() {
        this.isError = true;
      },
      save: function(event) {
        this.hash = false;
        var form = {
          name: this.name,
          lastname: this.lastname
        };
        this.isLoading = true;
        this.$http
          .post('/api/create/certificate', form)
          .then(function(response) {
            this.isLoading = false;
            if (response && response.body.hash) {
              this.hash = response.body.hash;
            } else {
              this.error();
            }
          }, function(err) {
            this.isLoading = false;
            this.error();
          });
      }
    }
  });
})(Vue);