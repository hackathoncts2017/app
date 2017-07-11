"use strict";
hackathon.controller("MainController", function(shared, $state, $scope, $mdSidenav, $mdComponentRegistry,$rootScope,mainService) {
    $scope.selectedIndex = 0;
    $scope.audiocall = function() {
		//alert("ff");
	}
	if(localStorage.deviceDetails) {
		var deviceDetails =JSON.parse(localStorage.deviceDetails);
		mainService.deviceDetails(deviceDetails).then(function(res) {
			if(!res.error) {
				localStorage.userDetails = JSON.stringify(res.data[0]);
			}
		});
	}
    $scope.selectCb = function(component,index) {
        $rootScope.selectedComponent = component;
        var componentName = "";
        if(index === 1){
            componentName = "Dashboard";
            $rootScope.$emit("headedText", {"header":componentName});
        } else if(index === 2) {
            componentName = "Map";
             $rootScope.$emit("headedText", {"header":componentName});
         } else if(index === 3) {
            componentName = "Product";
             $rootScope.$emit("headedText", {"header":componentName});
         } else if(index === 4) {
            componentName = "Search";
             $rootScope.$emit("headedText", {"header":componentName});
         } else {
            componentName = "Hackathon";
             $rootScope.$emit("headedText", {"header":componentName});
         }
        if($rootScope.speeckToUser){
            // $rootScope.speeckToUser({"text":"welcome to " + componentName})  
        } 
        $rootScope.$emit("resetProduct", {});    
    }
    $rootScope.$on("TabChange", function(controller,data){
          $scope.selectedIndex = data.tab;
		  document.getElementById("fff").click();
    });
    $rootScope.tabChange = function(no) {
        $rootScope.$emit("TabChange", {"tab":no});        
    }
});