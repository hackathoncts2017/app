"use strict";
hackathon.controller("HeaderController", function(shared, $state, $scope, $mdSidenav, $mdComponentRegistry,$rootScope) {

    var ctrl = this;

    this.auth = shared.info.auth;

    this.toggle = angular.noop;

    $scope.title = "";
    $rootScope.listView = false;
    $rootScope.mapView = true;
    

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
	$scope.headerbarshow = false;
    $rootScope.$on("headedText", function(controller,data){
           $scope.title = data.header
		   if(data.header == "Dashboard" || data.header == "register"){
				$scope.headerbarshow = false;
		   } else {
				$scope.headerbarshow = true;
		   }
    });

    $scope.tabclick =function(no) {
       $rootScope.tabChange(no);
       $mdSidenav("left").toggle()
    }
    $scope.show_list = function(){
    $rootScope.listView = true;
    $rootScope.mapView = false;
    }
    $scope.show_map = function(){
    $rootScope.listView = false;
    $rootScope.mapView = true;
    }
});