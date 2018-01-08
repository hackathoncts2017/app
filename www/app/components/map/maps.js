hackathon.controller("MapController", function(shared, $state, $scope, $mdSidenav, $mdToast,$mdComponentRegistry,NgMap,$rootScope,$http,MapService) {
	$scope.locations = [];
    $scope.feedbackflag = false;
    $scope.starFlag = false;
    		
    $scope.jobDetails = {}
    $scope.jobIdMapping = {};
    $scope.jobMapping = {};
    $scope.currentJob = {};
    $scope.adminEngMapping = {};
    $scope.adminJobMapping = {};
    $rootScope.jobId = 1;
    $scope.currentTimeTaken = 0;
    $scope.origin = "12.92,80.20";
    $scope.hospitals = ["12.91477592,80.22984445","12.93362997,80.2336961","12.9414305,80.23584187"];
    $scope.locateHospital = true;
    $scope.numberMapping = {
        "one": 1,
        "two" : 2,
        "three" : 3,
        "four" : 4,
        "five" : 5,
        "six" : 6,
        "seven" : 7,
        "eight" : 8,
        "nine" : 9,
        "ten" : 10
    };
    $scope.indexVal = 0;
    $scope.prevPosition = '';
    $scope.jjj= function(){
        var h = window.innerHeight;
        $scope.mapHeight = h - 126;
    }
	$scope.widthChart = $(window).height() - 58;
	$rootScope.$on("loadDataPoints", function(controller,data){
			$scope.locations = [];
			if(data.location){
				$scope.locations.push({"locationVal" : "12.9127111, 80.2191472", "image" : "", isEng : true});
			}
		   $rootScope.loadMap()
    });	
	$scope.locations = [];
    $rootScope.loadMap = function() {
        
        $rootScope.jobId = 1;
        $scope.currentTimeTaken = 0;
		var userId = JSON.parse(localStorage.userId);
		$rootScope.userId = userId;
        $scope.indexVal = 0;
        $scope.prevPosition = '';
	$scope.timeTaken1 = 0;
	//uncomment before build
	 //if(localStorage.userId != 2) {
		$scope.locations.push({"locationVal" : "12.9127111, 80.2191472", "image" : "", isEng : true});
		   
	 //}
       NgMap.getMap().then(function(map) {
            
            $rootScope.mapDetails = map; 
            var options = {
                enableHighAccuracy: true
            };
           
			$rootScope.isCustomer = localStorage.userId ;
			
            if($scope.locations.length > 0){
				$rootScope.allDirections = $rootScope.mapDetails.directionsRenderers;
					 setTimeout(function(){
					$scope.timeTaken1 = $rootScope.allDirections[0].directions.routes[0].legs[0].duration.text.replace('mins','').replace('min','');
					console.log("time taken",$scope.timeTaken1);
					$scope.$applyAsync();
					localStorage.setItem("mapDetails", $rootScope.allDirections )
							},2000);   
				/*setInterval(function() {
						
					navigator.geolocation.getCurrentPosition(function(pos) {
						$scope.position = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
						console.log(JSON.stringify($scope.position));  
						$rootScope.allDirections = $rootScope.mapDetails.directionsRenderers;
						$scope.timeTaken1 = $rootScope.allDirections[0].directions.routes[0].legs[0].duration.text.replace('mins','').replace('min','');
							console.log("time taken",$scope.timeTaken1);
							$scope.$applyAsync();
							setTimeout(function(){
								$rootScope.allDirections = $rootScope.mapDetails.directionsRenderers;
								console.log("All directions", $rootScope.mapDetails.directionsRenderers);
								console.log("My loc", $rootScope.myLoc);
							},2000);
						if($scope.position.lat().toFixed(3) != $scope.prevPosition.lat || $scope.position.lng().toFixed(3) != $scope.prevPosition.lng) {
						   $scope.prevPosition = {"lat": $scope.position.lat().toFixed(3), "lng" : $scope.position.lng().toFixed(3)};
						}         
					}, 
					function(error) {                    
						alert('Unable to get location: ' + error.message);
					}, options);
				},7000);*/
            }
           
        }); 
    }
    
})