'use strict';

/**
 * @ngdoc overview
 * @name imgurrandomApp
 * @description
 * # imgurrandomApp
 *
 * Main module of the application.
 */
angular
  .module('imgurRandomApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
