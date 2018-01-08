"use strict";

angular.module("ngapp").config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider){
	localStorage.isNotSOS = true;
	if(localStorage.isNotSOS) {
		localStorage.userId = 2;
		$urlRouterProvider.otherwise("/map");
	} else if(!localStorage.userDetails){
		$urlRouterProvider.otherwise("/register");
	} else {
		$urlRouterProvider.otherwise("/sos");
	}

    $stateProvider.state("main", {
        url: "/main",
        templateUrl: "app/components/main/main.html",
        title: "Cordova Angular-Material",
        controller: "MainController",
        controllerAs: "main"
    });
    $stateProvider.state("map", {
        url: "/map",
        templateUrl: "app/components/map/maps.html",
        title: "Map",
        controller: "MapController",
        controllerAs: "map"
    });
    
    $stateProvider.state("register", {
        url: "/register",
        templateUrl: "app/components/register/registerDevice.html",
        title: "Register Device",
        controller: "registerDeviceController",
        controllerAs: "register"
    });
	
	$stateProvider.state("sos", {
        url: "/sos",
        templateUrl: "app/components/sos/sos.html",
        title: "Help Me",
        controller: "sosController",
        controllerAs: "sos"
    });
	$stateProvider.state("firstaid", {
        url: "/firstaid",
        templateUrl: "app/components/search/search.html",
        title: "Help Me",
        controller: "searchController",
        controllerAs: "speach"
    });
	$stateProvider.state("landing", {
        url: "/landing",
        templateUrl: "app/components/landing/landing.html",
        title: "landing",
        controller: "landingController",
        controllerAs: "landing"
    });
	
}]);
