"use strict";
hackathon.controller("HeaderController", function(shared, $state, $scope, $mdSidenav, $mdComponentRegistry,$rootScope) {

    var ctrl = this;

    this.auth = shared.info.auth;

    this.toggle = angular.noop;

    $scope.title = "";

    this.isOpen = function() {
        return false
    };
    $mdComponentRegistry
        .when("left")
        .then(function(sideNav) {
            ctrl.isOpen = angular.bind(sideNav, sideNav.isOpen);
            ctrl.toggle = angular.bind(sideNav, sideNav.toggle);
        });

    this.toggleRight = function() {
        $mdSidenav("left").toggle()
            .then(function() {});
    };

    this.close = function() {
        $mdSidenav("right").close()
            .then(function() {});
    };
    $rootScope.$on("headedText", function(controller,data){
           $scope.title = data.header
    });

    $scope.tabclick =function(no) {
       $rootScope.tabChange(no);
    }
});