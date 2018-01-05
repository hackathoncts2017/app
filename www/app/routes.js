"use strict";

angular.module("ngapp").config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider){

    $urlRouterProvider.otherwise("/register");

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
	
}]);
