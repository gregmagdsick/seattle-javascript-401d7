const angular = require('angular');
const demoApp = angular.module('demoApp', [require('angular-route')]);

require('./services')(demoApp);
require('./bears')(demoApp);
require('./auth')(demoApp);

demoApp.config(['$routeProvider', function($rp) {
  $rp
    .when('/bears', {
      templateUrl: 'templates/bears/views/bears_view.html',
      controller: 'BearsController',
      controllerAs: 'bearsctrl'
    })
    // AUTH_EXP: how do the signin/up routes differ and what is their relationship
    // with one another

    // These two routes use different controllers. They use the same template and
    // are called the same thing(controllerAs) so that they can access the same
    // HTML elements in the webpage, reducing redundant fields that would otherwise
    // exist. The controllers' keys/methods have the same names, so that they can
    // indeed use the same html elements, but give them different functions, as
    //well as different button text depending on the route.
    .when('/signup', {
      templateUrl: 'templates/auth/views/auth_view.html',
      controller: 'SignUpController',
      controllerAs: 'authctrl'
    })
    .when('/signin', {
      templateUrl: 'templates/auth/views/auth_view.html',
      controller: 'SignInController',
      controllerAs: 'authctrl'
    })
    .otherwise({
      redirectTo: '/signup'
    });
}]);
