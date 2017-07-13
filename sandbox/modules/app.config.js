(function(){
  'use strict';

  //Main Config Module to init page routing.

  angular.module('hackathonApp').config(['$routeProvider', function($routeProvider) {
      $routeProvider
      .when('/home', {
      templateUrl: 'modules/home/homeScreen.html',
      controller: 'homeController'
   }).
   when('/dash', {
      templateUrl: 'modules/dash/dashBoard.html',
      controller: 'dashboardController'
   }).otherwise({
      redirectTo: '/dash'
   });

  }]).config(function($httpProvider){
    //$httpProvider.interceptors.push('httpRequestInterceptor');
    //delete $httpProvider.defaults.headers.common['X-Requested-With'];
});
})();
