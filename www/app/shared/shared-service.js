"use strict";

hackathon.service("shared", function(){ // One of The Ways To Share Informations Across the Controllers

    this.info = {
        title: "cordova-angular-angularMaterial-seed",
        auth: "Mario Aleo"
    };
});

hackathon.directive('header', function () {
    return {
        replace: true,
        templateUrl: "app/shared/header/header.html",
        controller: 'HeaderController',
        controllerAs: 'head',
    }
});

hackathon.directive('dashboard', function () {
    return {
        replace: true,
        templateUrl: "app/components/dashboard/dashboard.html",
        controller: 'DashboardController',
        controllerAs: 'dash',
    }
});

hackathon.directive('product', function () {
    return {
        replace: true,
        templateUrl: "app/components/product/product.html",
        controller: 'ProductController',
        controllerAs: 'product',
    }
});

hackathon.directive('mapcomponent', function () {
    return {
        replace: true,
        templateUrl: "app/components/map/maps.html",
        controller: 'MapController',
        controllerAs: 'mapctrl',
    }
});
hackathon.directive('speech', function () {
    return {
        replace: true,
        templateUrl: "app/shared/speech/speech.html",
        controller:"SpeechController",
        controllerAs: 'speechctrl',
    }
});