var baseUrl = require('../../config').baseUrl;
module.exports = function(app) {
  app.controller('SignInController', ['$http', '$location', 'cfHandleError', 'cfAuth', function($http, $location, handleError, auth) {
    // AUTH_EXP: how does this differ from the sign_up_controller?
    // This controller queries the server to see if the supplied credetials
    // match an already registered user, usign a GET request instead of the
    // sign_up_controller's POST request. The username and password are sent
    // as data in the header. The controllers are intentionally similar so
    // that they can easily access the same fields in the HTML. Which controller
    // is active is determined by the router reading which route you are on.
    this.buttonText = 'Sign in to existing user';
    this.errors = [];
    this.authenticate = function(user) {
      $http({
        method: 'GET',
        url: baseUrl + '/api/signin',
        headers: {
          'Authorization': 'Basic ' + window.btoa(user.username + ':' + user.password)
        }
      })
        .then((res) => {
          auth.saveToken(res.data.token);
          auth.getUsername();
          $location.path('/bears');
        }, handleError(this.errors, 'could not sign into user'));
    };
  }]);
};
