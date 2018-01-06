
(function(){
  'use strict';

  	angular.module('ngapp').controller('registerDeviceController',['$scope','$timeout','$rootScope','$window',function($scope,$timeout,$rootScope,$window){
        //$scope.$parent.displayHeaderFooter(false,false);


        $scope.emergency =[];
		$scope.personal ={"name":"","number":""};
		$scope.emergencycount = 1;
		$scope.emergencydetails = {"count":1,"name":"","number":"","mandatory":true};
        $scope.emergency.push($scope.emergencydetails);
		$scope.registerbar = true;
		$scope.navbar =false;
		$scope.headername = "Register";
		
		$scope.userDetails ={"personalDetails":"","emergencyDetails":[]};
		var userDetails = localStorage.userDetails;
		console.log("userDetails",userDetails);
		if(userDetails){
			$scope.userDetails = JSON.parse(localStorage.userDetails);
			console.log("$scope.userDetails",$scope.userDetails);
			$scope.personal = $scope.userDetails.personalDetails;
			$scope.emergency = $scope.userDetails.emergencyDetails;
			$scope.headername = "Profile";
			
		}
		
		
		console.log("$scope.emergency",$scope.emergency);
        $scope.addmore = function(){
			
            $scope.emergencycount ++;
			
			$scope.emergencydetails = {"count":$scope.emergencycount,"name":"","number":"","mandatory":false};
			$scope.emergency.push($scope.emergencydetails);
            
        }
		
		$scope.delete = function(count){
			var id = count - 1;
			$scope.emergency.splice(id, 1);
			$scope.emergencycount = $scope.emergency.length;
			
            
        }
		
		
		$scope.submitRegister = function(){
			$scope.userDetails ={"personalDetails":$scope.personal,"emergencyDetails":$scope.emergency};
			console.log("$scope.userDetails",$scope.userDetails);
			localStorage.userDetails = JSON.stringify($scope.userDetails);
			console.log("localStorage.userDetails",localStorage.userDetails);
			location.href = "#sos";
		}
		
		
		$scope.filterValue = function($event){
        if(isNaN(String.fromCharCode($event.keyCode))){
            $event.preventDefault();
        }
};
        
       
  	}]);
    
  
  })();
