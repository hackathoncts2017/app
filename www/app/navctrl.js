
(function(){
  'use strict';

  	angular.module('ngapp').controller('navCtrl',['$scope','$timeout','$rootScope','$window','$mdSidenav','$log','sosService',function($scope,$timeout,$rootScope,$window,$mdSidenav, $log,sosService){
		
		$scope.toggleRight = buildToggler('right');
		$scope.navbar =true;
		$scope.registerbar = true;
		// var url =window.location.href;
		// url = url.split('#');
		// url = url[1];
		// console.log(url);

		// if(url == '/landing'){
		// 	$scope.navbar =false;
		// $scope.registerbar = false;
		// }
		
		
		$scope.enableSpeech = false;
		
    $scope.isOpenRight = function(){

      return $mdSidenav('right').isOpen();
    };
	$scope.contactEmergency = function(isEmergency){
			var msg = "Reached Location. On the way to hospital.";
			
			var emergencyContactDetails = JSON.parse(localStorage.data).contact;;
			for(var i = 0; i < emergencyContactDetails.length; i++) {
				var postmsg = {phoneNo:"" + emergencyContactDetails[i],msg:msg};
				sosService.sendSms(postmsg).then(function(){});
			}
			socket.emit('reachedEmit',{ data:JSON.parse(localStorage.data),id:socket.id });
			
			
			//sosService.sendSms(postmsg).then(function(){
				//alert("dd");
			//})
		};
	var userDetails = localStorage.userDetails;
		
		if(userDetails){
			$scope.userDetails = JSON.parse(localStorage.userDetails);
			
			
			
			
		}
		$scope.explorePatient = false;
		$scope.toggleexplorePatient = function(){
			if($scope.explorePatient){
            $scope.explorePatient = false;
			} 
			else{
			$scope.explorePatient = true;
			}
		}
		$scope.unexplorePatient = function(){
			$scope.explorePatient = false;
		}

		$scope.exploreDriver = false;
		$scope.toggleexploreDriver = function(){
			if($scope.exploreDriver){
            $scope.exploreDriver = false;
			} 
			else{
			$scope.exploreDriver = true;
			}
		}
		$scope.unexploreDriver = function(){
			$scope.exploreDriver = false;
		}
	 /**
     * Supplies a function that will continue to operate until the
     * time is up.
     */
    function debounce(func, wait, context) {
      var timer;

      return function debounced() {
        var context = $scope,
            args = Array.prototype.slice.call(arguments);
        $timeout.cancel(timer);
        timer = $timeout(function() {
          timer = undefined;
          func.apply(context, args);
        }, wait || 10);
      };
    }

    /**
     * Build handler to open/close a SideNav; when animation finishes
     * report completion in console
     */
    function buildDelayedToggler(navID) {
      return debounce(function() {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug("toggle " + navID + " is done");
            
          });
      }, 200);
    }

    function buildToggler(navID) {
      return function() {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug("toggle " + navID + " is done");
            
          });
      };
    }
	
	$scope.close = function () {
      // Component lookup should always be available since we are not using `ng-if`
      $mdSidenav('right').close()
        .then(function () {
          $log.debug("close RIGHT is done");
        });
    };
	
	$scope.profile = function(){
      location.href= "#register";
	  
		$scope.close();
		 $scope.enableSpeech = false;
		 $rootScope.userId = null;
    };
	$scope.firstaid = function(){
      location.href= "#firstaid";
	  $scope.close();
	  $scope.enableSpeech = true;
	  $rootScope.userId = null;
	   $scope.map = false;
	  
    };
	
	$scope.home = function(){
      location.href= "#sos";
	  $scope.close();
	  $scope.enableSpeech = false;
	  $rootScope.userId = null;
	   $scope.map = false;
	  
	  
    };
	
	$scope.track = function(){
      location.href= "#map";
	  $scope.close();
	   $scope.enableSpeech = false;
	   $scope.map = true;
	  
    };
	
	$scope.signout = function(){
      location.href= "#register";
	  $scope.close();
	   $scope.enableSpeech = false;
	  delete localStorage.userDetails;
	  $rootScope.userId = null;
	  
	  
    };
		
		
  	}]);
 
   
  })();
