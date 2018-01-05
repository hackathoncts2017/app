
(function(){
  'use strict';

  	angular.module('ngapp').controller('sosController',['$scope','$timeout','$rootScope','$window','sosService',function($scope,$timeout,$rootScope,$window,sosService){
		var timeObject = new Date(); 
		timeObject = new Date(timeObject .getTime() + 1000*15.5);
		$scope.sosTime = timeObject.toString();
		$scope.stopTime= function(){
			$(".timer").hide();
			if($scope.sosInit && $scope.onstart) {
				$scope.sosClick();
			}
		}
		$scope.sosInit = true;
		$scope.onstart = true;
		setTimeout(function(){
			$scope.stopTime();
		},16000);
		$scope.sosClick = function(){
			$scope.onstart = false;
			$scope.sosInit = false;
			$scope.contactEmergency(true);
		};
		$scope.contactEmergency = function(isEmergency){
			var msg = "please come fast";
			if(!isEmergency) {
				msg = "Sorry am clicked wrongly";	
			}
			var postmsg = {phoneNo:8903639221,msg:msg};
			//sosService.sendSms(postmsg).then(function(){
				//alert("dd");
			//})
		};
		$scope.cancelsos = function(){
			$scope.sosInit = true;
			$scope.onstart = false;
			$scope.contactEmergency(false);
		};
  	}]);
 
   
  })();
