
(function(){
  'use strict';

  	angular.module('hackathonApp').controller('narrativeController',['$scope','homeModel','appService','$window','appconfig',function($scope,homeModel,appService,$window,appconfig){
        $scope.$parent.displayHeaderFooter(true,true);
  	}]);
  })();