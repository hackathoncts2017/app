
(function(){
  'use strict';

  	angular.module('hackathonApp').controller('dashboardController',['$scope','homeModel','appService','$window','appconfig',function($scope,homeModel,appService,$window,appconfig){
  		  
        $scope.$parent.displayHeaderFooter(false,false);

        
        $scope.todayDate = new Date();
        $scope.todayCalls = 20;
        $scope.todayAttempted = 10;
        $scope.todayPending = 5;
        $scope.weatherIcon = "assets/icon.png";
        $scope.minWeather = "19";
        $scope.maxWeather = "32";
        $scope.userName = "Raja sola 2";
        $scope.designation = "Senior Manager";

        $scope.userImage = "assets/userIcon.png";

        $scope.callCounter = "22:23"

        $scope.selectedIndex = 0;
        
  	}]);
  })();