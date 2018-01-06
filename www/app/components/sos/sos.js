
(function(){
  'use strict';

  	angular.module('ngapp').controller('sosController',['$scope','$timeout','$rootScope','$window','sosService',function($scope,$timeout,$rootScope,$window,sosService){
		var timeObject = new Date(); 
		timeObject = new Date(timeObject .getTime() + 1000*15.5);
		$scope.sosTime = timeObject.toString();
		$scope.registerbar = false;
		$scope.navbar =true;
		$scope.stopTime= function(){
			$(".timer").hide();
			if($scope.sosInit && $scope.onstart) {
				$scope.sosClick();
			}
		}
		var geocoder = new google.maps.Geocoder;
		
		navigator.geolocation.getCurrentPosition(function(pos) {
			var latlng = {lat: pos.coords.latitude, lng: pos.coords.longitude};
			geocoder.geocode({'location': latlng}, function(results, status) {
				if(status == "OK"){
					$scope.currentAddress = results[0].formatted_address;
					$scope.$applyAsync();
				}
			});
		});
		$scope.sosInit = true;
		$scope.onstart = true;
		var timerClk = setTimeout(function(){
			$scope.stopTime();
		},16000);
		$scope.sosClick = function(){
			$scope.onstart = false;
			$scope.sosInit = false;
			$scope.contactEmergency(true);
		};
		$scope.contactEmergency = function(isEmergency){
			var msg = "Emergency!! Please help";
			if(!isEmergency) {
				msg = "Wrong SOS triggered. Appologize for the inconvinience caused.";	
			}
			var emergencyContactDetails = JSON.parse(localStorage.userDetails).emergencyDetails;
			for(var i = 0; i < emergencyContactDetails.length; i++) {
				var postmsg = {phoneNo:+emergencyContactDetails[i].number,msg:msg};
				sosService.sendSms(postmsg).then(function(){});
			}
		};
		$scope.cancelsos = function(){
			$scope.sosInit = true;
			$scope.onstart = false;
			$scope.contactEmergency(false);
		};
		$scope.canceltimer = function(){
			clearInterval(timerClk);
			$(".timer").hide();
		};
  	}]);
 
   
  })();
