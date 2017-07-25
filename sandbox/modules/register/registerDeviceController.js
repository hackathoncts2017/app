
(function(){
  'use strict';

  	angular.module('hackathonApp').controller('registerDeviceController',['$scope','homeModel','appService','$window','appconfig','$timeout',function($scope,homeModel,appService,$window,appconfig,$timeout){
        $scope.$parent.displayHeaderFooter(false,false);
        $scope.initRegcall = true;

        $scope.showSuccess = false;
        $scope.enableMic = function(){

        }

        $scope.registerDevice = function(){
            $scope.initRegcall = !$scope.initRegcall;
            if($scope.initRegcall === true){
                var registerNumber =  $("register-field").text();
                if(isNaN(registerNumber)){
                    alert("Register Number is not Valid");
                }else if(registerNumber === "24352"){
                    $timeout(function(){
                        alert("Register Number is not Valid");
                        $scope.showSuccess = true;
                    },1500);
                }
            }
        }
  	}]);
  })();