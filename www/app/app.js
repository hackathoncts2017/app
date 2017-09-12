hackathon = angular.module("ngapp", [ "ui.router", "ngMaterial", "ngCordova", "ngStorage","ngMap","highcharts-ng"])
// ngTouch is No Longer Supported by Angular-Material
var urlOld = "https://hackathoncts.herokuapp.com/"
.run(function($rootScope, $cordovaDevice, $cordovaStatusbar){
  document.addEventListener("deviceready", function () {
    $cordovaStatusbar.overlaysWebView(false); // Always Show Status Bar
    $cordovaStatusbar.styleHex('#E53935'); // Status Bar With Red Color, Using Angular-Material Style
    //window.plugins.orientationLock.lock("portrait");
	if(typeof device != "undefined" ) {
		if(localStorage.userToggle == undefined) {
			//commenting for testing
			localStorage.deviceDetails = JSON.stringify(device);		
		}
		cordova.plugins.diagnostic.isLocationEnabled(function(enabled){
			console.log("Location is " + (enabled ? "enabled" : "disabled"));
			if(!enabled){
				cordova.plugins.diagnostic.switchToLocationSettings();
			}
		 }, function(error){
			console.error("The following error occurred: "+error);
		});
	}
  }, false);
 //var devideId = "c0e9928ff73b8fa11";
  //localStorage.deviceDetails = JSON.stringify({"available":true,"platform":"Android","version":"7.0","uuid": devideId ,"cordova":"6.2.3","model":"Lenovo K33a42","manufacturer":"LENOVO","isVirtual":false,"serial":"d4d2cc44"} );        

if(localStorage.userToggle){
	var devideId = "c0e9928ff73b8fa11"
	if(localStorage.userToggle  == "admin") {
		devideId = "c0e9928ff73b8fa11";
	} else if(localStorage.userToggle  == "engineer") {
		devideId = "1234567890";
	} else  {
		devideId = "52c65734ab2b7a54";
	}
	localStorage.deviceDetails = JSON.stringify({"available":true,"platform":"Android","version":"7.0","uuid": devideId ,"cordova":"6.2.3","model":"Lenovo K33a42","manufacturer":"LENOVO","isVirtual":false,"serial":"d4d2cc44"} );        
  
}
/* Hijack Android Back Button (You Can Set Different Functions for Each View by Checking the $state.current)
  document.addEventListener("backbutton", function (e) {
      if($state.is('init')){
        navigator.app.exitApp();
      }  else{
        e.preventDefault();
      }
    }, false);*/
})

.config(function($mdThemingProvider, $mdGestureProvider) { // Angular-Material Color Theming
  $mdGestureProvider.skipClickHijack();

  $mdThemingProvider.theme('default')
    .primaryPalette('red')
    .accentPalette('blue');
});
