hackathon.controller("MapController", function(shared, $state, $scope, $mdSidenav, $mdComponentRegistry,NgMap,$rootScope) {
	NgMap.getMap().then(function(map) {
		$rootScope.mapDirections = map.directionsRenderers[0];
	  });

	$rootScope.$on("MapSpeech", function(controller,data){
           console.log(data)
    });
    $rootScope.$on("headedText", function(controller,data){
    	if(data.header == "Map") {
    		if($rootScope.speeckToUser){
                 $rootScope.speeckToUser({"text":"Distance to your destination is " + $rootScope.mapDirections.directions.routes[0].legs[0].distance.text + 
                 	" and total time takes is " + $rootScope.mapDirections.directions.routes[0].legs[0].duration.text})  
            }
    	}
		console.log(data);
   });
    //$rootScope.$emit("headedText", {"header":"Map"});

})