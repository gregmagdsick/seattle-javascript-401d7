var baseUrl = require('../../config').baseUrl;
module.exports = function(app) {
  app.controller('SignUpController', ['$http', '$location',  'cfHandleError', 'cfAuth', function($http, $location, handleError, auth) {
    // AUTH_EXP: how does this differ from the sign_in_controller
    // This controller sends a new user to the server, via a post
    // request. Then, it saves the token to local storage. The names
    // look similar to the sign_in_controller so that they can access
    // the same fields in the HTML. Which one is active is determined
    // by the router reading which route you are on.
    this.signup = true;
    this.errors = [];
    this.buttonText = 'Create New User!'
    this.authenticate = function(user) {
      $http.post(baseUrl + '/api/signup', user)
        .then((res) => {
          auth.saveToken(res.data.token);
          auth.getUsername();
          $location.path('/bears');
        }, handleError(this.errors, 'Could not create user'));
    };
  }]);
};
