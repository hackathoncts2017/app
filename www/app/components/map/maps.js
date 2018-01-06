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
    $rootScope.loadMap = function() {
        $scope.locations = [];
        $rootScope.jobId = 1;
        $scope.currentTimeTaken = 0;
		var userId = JSON.parse(localStorage.userId);
		$rootScope.userId = userId;
        $scope.indexVal = 0;
        $scope.prevPosition = '';
	$scope.timeTaken1 = 0;
	 $scope.locations.push({"locationVal" : "13.092680199999999,80.28071840000008", "image" : "", isEng : true});
       NgMap.getMap().then(function(map) {
            
            $rootScope.mapDetails = map; 
            var options = {
                enableHighAccuracy: true
            };
           
			$rootScope.isCustomer = localStorage.userId ;
            
            $rootScope.myLoc = map.center.lat() + ',' + map.center.lng();
			$scope.prevPosition = {"lat": map.center.lat().toFixed(3), "lng" : map.center.lng().toFixed(3)};
			$rootScope.allDirections = $rootScope.mapDetails.directionsRenderers;
				 setTimeout(function(){
				$scope.timeTaken1 = $rootScope.allDirections[0].directions.routes[0].legs[0].duration.text.replace('mins','').replace('min','');
				console.log("time taken",$scope.timeTaken1);
				$scope.$applyAsync();
						},2000);   
			setInterval(function() {
					
				navigator.geolocation.getCurrentPosition(function(pos) {
					$scope.position = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
					console.log(JSON.stringify($scope.position));
					$rootScope.myLoc = $scope.position.lat() + ',' + $scope.position.lng();   
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
			},7000);
            
           
        }); 
    }
    
})