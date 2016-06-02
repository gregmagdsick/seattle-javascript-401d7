module.exports = function(app) {
  app.controller('AuthController', ['cfAuth', 'cfHandleError',  '$location', function(auth, handleError, $location) {
    this.username = '';
    this.errors = [];
    this.getUsername = function() {
      // AUTH_EXP: What happens when this function is called?
      // this calls the getusername method in app/js/auth/services/auth_services.js
      // which first checks to see if this.username exists. If it does, then it returns
      // this.username. If not, it checks to see if there is a token saved. If the token
      // isnt' there, it errors out(because it knows the following action won't happen).
      // if there is a token, then it queries the server for the current logged-in user's
      // username, and saves it as this.username. After that is done, .then is called, and
      // saves currentUser to equal this.username
      auth.getUsername()
        .then((currentUser) => {
          this.username = currentUser;
        }, handleError(this.errors, 'could not get username'));
    }.bind(this);

    this.logout = function() {
      auth.removeToken();
      this.username = '';
      $location.path('/signin');
    }.bind(this);
  }]);
};
