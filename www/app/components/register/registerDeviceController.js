
(function(){
  'use strict';

  	angular.module('ngapp').controller('registerDeviceController',['$scope','$timeout','$rootScope','$window',function($scope,$timeout,$rootScope,$window){
        //$scope.$parent.displayHeaderFooter(false,false);


        $scope.emergency =[];
		$scope.personal ={"name":"","number":""};
		$scope.emergencycount = 1;
		$scope.emergencydetails = {"count":1,"name":"","number":"","mandatory":true};
        $scope.emergency.push($scope.emergencydetails);
		console.log("$scope.emergency",$scope.emergency);
        $scope.addmore = function(){
			
            $scope.emergencycount ++;
			
			$scope.emergencydetails = {"count":$scope.emergencycount,"name":"","number":"","mandatory":false};
			$scope.emergency.push($scope.emergencydetails);
            
        }
		$scope.submitRegister = function(){
			console.log("$scope.emergency",$scope.emergency);
			console.log("$scope.personal",$scope.personal);
		}
		
		
		$scope.filterValue = function($event){
        if(isNaN(String.fromCharCode($event.keyCode))){
            $event.preventDefault();
        }
};
        
       
  	}]);
    
  
  })();
