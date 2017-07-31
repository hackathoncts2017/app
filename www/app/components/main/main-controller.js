"use strict";
hackathon.controller("MainController", function(shared, $state, $scope, $mdSidenav, $mdComponentRegistry,$rootScope,mainService) {
    $scope.selectedIndex = 1;
    $scope.audiocall = function() {
		//alert("ff");
	}
    $scope.isUser = false;
    $scope.isadmin = false;
    $scope.isEngineer = false;
	if(localStorage.deviceDetails) {
		var deviceDetails =JSON.parse(localStorage.deviceDetails);
        console.log(deviceDetails);
		mainService.deviceDetails(deviceDetails).then(function(res) {
			if(!res.error) {
                console.log("resposnes",res);
				localStorage.userDetails = JSON.stringify(res.data[0]);
                $scope.isUser = false;
                if(localStorage.userDetails) {
                    if(JSON.parse(localStorage.userDetails).isAdmin == 1) {
                        $scope.isadmin = true
                    } else if(JSON.parse(localStorage.userDetails).isAdmin == 0 && JSON.parse(localStorage.userDetails).isCustomer == 1){
                         $scope.isUser = true;
                     } else {
                         $scope.isEngineer = true;
                     }
                }
			}
		});
	}
    
    
    $scope.selectCb = function(component,index) {
        $rootScope.selectedComponent = component;
        var componentName = "";
        //var header = document.getElementsByTagName("md-toolbar")[0];        
        if(index === 1){
            componentName = "Dashboard";
            //header[0].style.display = "none";
            $rootScope.mapTab = false;
            
            $rootScope.$emit("headedText", {"header":componentName});
        } else if(index === 2) {
            componentName = "Map";
            $rootScope.mapTab = true;
            // header[0].style.display = "block";
             $rootScope.$emit("headedText", {"header":componentName});
         } else if(index === 3) {
            componentName = "Product";
             $rootScope.mapTab = false;
             //header[0].style.display = "block";
             $rootScope.$emit("headedText", {"header":componentName});
            
         } else if(index === 4) {
            componentName = "Search";
            $rootScope.mapTab = false;
             //header[0].style.display = "block";
             $rootScope.$emit("headedText", {"header":componentName});
             
         } else {
            componentName = "Hackathon";
            $rootScope.mapTab = false;
             //header[0].style.display = "block";
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