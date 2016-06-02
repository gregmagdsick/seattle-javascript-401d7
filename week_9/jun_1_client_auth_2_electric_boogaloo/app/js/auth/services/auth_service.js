var baseUrl = require('../../config').baseUrl;

module.exports = function(app) {
  app.factory('cfAuth', ['$http', '$q', function($http, $q) {
    // AUTH_EXP: explain what each of these functions are accomplishing and
    // what data we're storing in this service

    // This service stores the username and authorization token. The username is only
    // stored in this.username, while the token is stored in this.token, as well as
    // the default http header (for submitting http requests to the server), as well
    // as localStorage, so that the token persists between sessions if the user does
    // not logout.
    return {
      // this function deletes the token in all 3 locations that it could be
      // stored, and deletes the username value.
      removeToken: function() {
        this.token = null;
        this.username = null;
        $http.defaults.headers.common.token = null;
        window.localStorage.token = '';
      },
      // This function is saving a token received from the server upon submitting
      // successful login credentials to all 3 locations that we want it to be
      // stored for use in this app.
      saveToken: function(token) {
        this.token = token;
        $http.defaults.headers.common.token = token;
        window.localStorage.token = token;
        return token;
      },
      // This function does the following: if this.token exists simply return the
      // token. If this.token doesn't exist, it calls saveToken on the token saved
      // in localStorage (say, somone logged in to the site previously, but didn't
      // logout)
      getToken: function() {
        this.token || this.saveToken(window.localStorage.token);
        return this.token;
      },
      // this function checks if this.username exists. If it does, it returns
      // this.username. If it doesn't the function checks to see if an auth token
      // exists, because we'll need one for the next line of the function. If the
      // token doesn't exist, it returns an error. Then the function queries the
      // server to grab the current logged-in user's username.
      getUsername: function() {
        return $q(function(resolve, reject) {
          if (this.username) return resolve(this.username);
          if (!this.getToken()) return reject(new Error('no authtoken'));

          $http.get(baseUrl + '/api/profile')
            .then((res) => {
              this.username = res.data.username;
              resolve(res.data.username);
            }, reject);
        }.bind(this));
      }
    }
  }]);
};
