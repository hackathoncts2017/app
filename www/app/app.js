hackathon = angular.module("ngapp", [ "ui.router", "ngMaterial", "ngCordova", "ngStorage","ngMap","highcharts-ng"])
// ngTouch is No Longer Supported by Angular-Material

.run(function($rootScope, $cordovaDevice, $cordovaStatusbar){
  document.addEventListener("deviceready", function () {
    $cordovaStatusbar.overlaysWebView(false); // Always Show Status Bar
    $cordovaStatusbar.styleHex('#E53935'); // Status Bar With Red Color, Using Angular-Material Style
    //window.plugins.orientationLock.lock("portrait");
	if(typeof device != "undefined") {
		localStorage.deviceDetails = JSON.stringify(device);		
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

// localStorage.deviceDetails = JSON.stringify({"available":true,"platform":"Android","version":"7.0","uuid":"3","cordova":"6.2.3","model":"Lenovo K33a42","manufacturer":"LENOVO","isVirtual":false,"serial":"d4d2cc44"} );        
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
