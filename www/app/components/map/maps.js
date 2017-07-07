hackathon.controller("MapController", function(shared, $state, $scope, $mdSidenav, $mdComponentRegistry,NgMap,$rootScope) {
	NgMap.getMap().then(function(map) {
	    console.log(map.getCenter());
	    console.log('markers', map.markers);
	    console.log('shapes', map.shapes);
	  });

	$rootScope.$on("MapSpeech", function(controller,data){
           console.log(data)
    });
    //$rootScope.$emit("headedText", {"header":"Map"});

})