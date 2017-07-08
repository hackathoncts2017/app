hackathon.controller("MapController", function(shared, $state, $scope, $mdSidenav, $mdComponentRegistry,NgMap,$rootScope) {
	$scope.locations = ["CTS CKC","Thiruvanmiyur","Nungambakam"];
    NgMap.getMap().then(function(map) {

        
		$rootScope.mapDirections = map.directionsRenderers[0];
	  });

	$rootScope.$on("MapSpeech", function(controller,data){
           console.log(data)
    });
    $rootScope.$on("headedText", function(controller,data){
    	if(data.header == "Map") {
            console.log("inside map");
    		if($rootScope.speeckToUser){
                console.log("inside speech", $rootScope.mapDirections);
                // $rootScope.speeckToUser({"text":"Distance to your destination is " + $rootScope.mapDirections.directions.routes[0].legs[0].distance.text + 
                 //	" and total time takes is " + $rootScope.mapDirections.directions.routes[0].legs[0].duration.text})  
            }
    	}
		console.log(data);
   });
    //$rootScope.$emit("headedText", {"header":"Map"});

})