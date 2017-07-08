hackathon.controller("MapController", function(shared, $state, $scope, $mdSidenav, $mdComponentRegistry,NgMap,$rootScope) {
	$scope.locations = ["CTS CKC","Thiruvanmiyur","Nungambakam"];
    $rootScope.$on("MapSpeech", function(controller,data){           
           $scope.audioSplit(data.text);
    });
    $scope.audioSplit = function(audiotext) {
        if(audiotext.indexOf("Direction for") > -1){
            audiotext = audiotext.split("Direction for");
            if(audiotext.length > 1 && audiotext[1] != "") {
                audiotext = audiotext[1];
                $scope.searchText(audiotext);
            } else {
                $rootScope.speeckToUser({"text":"Location not available"})
            }
        } else {
            $rootScope.speeckToUser({"text":"Audio text"})
        }
    }
    NgMap.getMap().then(function(map) {
    	$rootScope.mapDirections = map.directionsRenderers[0];
        $rootScope.allDirections = map.directionsRenderers;
        console.log("All directions", map.directionsRenderers);
      });
    $scope.searchText = function(text) {
        var matchIndex = 0;
        if(text == "one") {
            matchIndex = 0;
        } else if (text == "two") {
            matchIndex = 1;
        } else {
            alert(text);
        }
        $rootScope.speeckToUser({"text":"Distance to your destination is " + $rootScope.allDirections[matchIndex].directions.routes[0].legs[0].distance.text + 
                    " and total time takes is " + $rootScope.allDirections[matchIndex].directions.routes[0].legs[0].duration.text})  
    }
    $rootScope.$on("headedText", function(controller,data){
    	if(data.header == "Map") {
            console.log("inside map");
    		if($rootScope.speeckToUser){
                console.log("inside speech", $rootScope.mapDirections);
                 $rootScope.speeckToUser({"text":"Distance to your destination is " + $rootScope.mapDirections.directions.routes[0].legs[0].distance.text + 
                 	" and total time takes is " + $rootScope.mapDirections.directions.routes[0].legs[0].duration.text})  
            }
    	}
		console.log(data);
   });
    //$rootScope.$emit("headedText", {"header":"Map"});

})