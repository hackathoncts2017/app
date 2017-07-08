hackathon.controller("MapController", function(shared, $state, $scope, $mdSidenav, $mdComponentRegistry,NgMap,$rootScope,$http) {
	$scope.locations = ["CTS CKC","Thiruvanmiyur","Nungambakam"];
    $rootScope.$on("MapSpeech", function(controller,data){           
           $scope.mapAudioSplit(data.text);
    });
    $scope.indexVal = 0;
    $scope.mapAudioSplit = function(audiotext) {
        if(audiotext.indexOf("details of") > -1){
            audiotext = audiotext.split("details of");
            if(audiotext.length > 1 && audiotext[1] != "") {
                audiotext = audiotext[1].trim();
                $scope.indexVal = +audiotext - 1;
                $scope.searchMapText(+audiotext);
            } else {
                $rootScope.speeckToUser({"text":"Location not available"})
            }
        } else if (audiotext.indexOf("direction for") > -1) {
            audiotext = audiotext.split("direction for");
            if(audiotext.length > 1 && audiotext[1] != "") {
                audiotext = audiotext[1].trim();
                $scope.indexVal = +audiotext - 1;
                $scope.searchRouteText(+audiotext);
            } else {
                $rootScope.speeckToUser({"text":"directions not available"})
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
    $scope.searchRouteText = function(text) {
        var matchIndex = 1000;
        if(!isNaN(text)) {
            matchIndex = text - 1;
        }
        if($rootScope.allDirections[matchIndex]) {
            var directions = $rootScope.allDirections[matchIndex].directions.routes[0].legs[0].steps,
            directionText = '';
            for(var i = 0 ; i< directions.length; i++) {
                directionText += directions[i].instructions + " for " + directions[i].distance.text.replace("km", "kilometers") + ". ";
            }
            $rootScope.speeckToUser({"text":directionText.replace(/<(?:.|\n)*?>/gm, ' ').replace('&amp;', '')});
        } else {
            $rootScope.speeckToUser({"text":"Chosen destination is not available"});
        }
        
    }
    $scope.searchMapText = function(text) {
        var matchIndex = 1000;
        if(!isNaN(text)) {
            matchIndex = text - 1;
        }
        if($rootScope.allDirections[matchIndex]) {
            $rootScope.speeckToUser({"text":"Distance to your destination is " + $rootScope.allDirections[matchIndex].directions.routes[0].legs[0].distance.text + 
                    " and total time to reach is " + $rootScope.allDirections[matchIndex].directions.routes[0].legs[0].duration.text})  
        } else {
            $rootScope.speeckToUser({"text":"Chosen destination is not available"});
        }
        
    }
    $rootScope.$on("headedText", function(controller,data){
    	if(data.header == "Map") {
  //           var dummyText = {
  //             "productId": "1",
  //             "productName": "test",
  //             "productUrl": "test",
  //             "productCount": 1,
  //             "orderBy": "me",
  //             "orderFor": "tu",
  //             "Location": "123"
  //           };
  //           $http({
  //               method: 'POST',
  //               url: "https://hackathoncts.herokuapp.com/product/save",
  //               data: JSON.stringify({
  //                 "productId": "1",
  //                 "productName": "test",
  //                 "productUrl": "test",
  //                 "productCount": 1,
  //                 "orderBy": "me",
  //                 "orderFor": "tu",
  //                 "Location": "123"
  //               }),
  //               headers: {'Content-Type': 'application/json'}
  //           }).then(function successCallback(response) {
  //   console.log("success ", reponse);
  // }, function errorCallback(response) {
  //     console.log("failure ", reponse);
  // });
    		if($rootScope.speeckToUser){
                console.log("inside speech", $rootScope.mapDirections);
                 $rootScope.speeckToUser({"text":"Distance to your destination is " + $rootScope.mapDirections.directions.routes[0].legs[0].distance.text + 
                 	" and total time to reach is " + $rootScope.mapDirections.directions.routes[0].legs[0].duration.text})  
            }
    	}
   });
    //$rootScope.$emit("headedText", {"header":"Map"});

})