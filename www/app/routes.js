"use strict";

angular.module("ngapp").config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider){

    $urlRouterProvider.otherwise("/landing");
	$stateProvider.state("landing", {
        url: "/landing",
        templateUrl: "app/components/landing/landing.html",
        title: "Landing page",
        controller: "landingController",
        controllerAs: "landing"
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
        title: "help Device",
        controller: "sosController",
        controllerAs: "sos"
    });
}]);
