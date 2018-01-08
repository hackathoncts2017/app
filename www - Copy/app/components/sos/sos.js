
(function(){
  'use strict';

  	angular.module('ngapp').controller('sosController',['$scope','$timeout','$rootScope','$window','sosService',function($scope,$timeout,$rootScope,$window,sosService){
		var timeObject = new Date(); 
		timeObject = new Date(timeObject .getTime() + 1000*15.5);
		$scope.sosTime = timeObject.toString();
		$scope.registerbar = false;
		$scope.navbar =true;
		$scope.appInitLoad = $rootScope.appInitLoad ;
		$scope.header = "header.html";
		$scope.currentAddress = "";
		$scope.audio = new Audio('sossound.mp3');
		$scope.stopTime= function(){
			$(".timer").hide();			
			$(".sos-logo").css("top","32%");
			$scope.audio.pause();
			localStorage.stopListening = true;			
			if($scope.sosInit && $scope.onstart && $rootScope.appInitLoad) {
				$scope.sosClick();
			}
		}
		$rootScope.$on("triggerSOS", function(controller,data){
			$scope.sosClick();
		});
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
			$rootScope.appInitLoad = false;
			$scope.onstart = false;
			$scope.sosInit = false;
			$(".sos-logo").css("top","32%");
			$scope.audio.play();
			$scope.contactEmergency(true);
		};
		$scope.contactEmergency = function(isEmergency){
			var msg = "Emergency!! Please help";
			if(!isEmergency) {
				msg = "Wrong SOS triggered. Appologize for the inconvinience caused.";	
			} 
			var emergencyContactDetails = JSON.parse(localStorage.userDetails).emergencyDetails
			var contactDetails = [];
			for(var i = 0; i < emergencyContactDetails.length; i++) {
				var postmsg = {phoneNo:"" + emergencyContactDetails[i].number,msg:msg};
				contactDetails.push("" + emergencyContactDetails[i].number);
				sosService.sendSms(postmsg).then(function(){});
			}
			var details = JSON.parse(localStorage.userDetails);
			localStorage.stopListening = true;
			if(isEmergency) {
				socket.emit('emergencyRequest', {
					"name": details.personalDetails.name,
					"contact":contactDetails,
					"location":$scope.currentAddress,
					"mobileno":details.personalDetails.number
				});
			} else {
				socket.emit('emergencyRequestCancel', {
					"name": details.personalDetails.name,
					"contact":contactDetails,
					"location":$scope.currentAddress,
					"mobileno":details.personalDetails.number
				});
			}
		};
		$scope.cancelsos = function(){
			$scope.sosInit = true;
			$scope.onstart = false;
			$scope.audio.pause();
			$scope.contactEmergency(false);
		};
		$scope.canceltimer = function(){
			clearInterval(timerClk);
			$rootScope.appInitLoad = false;
			$(".timer").hide();			
			$(".sos-logo").css("top","32%");
		};
  	}]);
 
   
  })();
