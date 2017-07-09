hackathon.controller("MapController", function(shared, $state, $scope, $mdSidenav, $mdComponentRegistry,NgMap,$rootScope,$http,MapService) {
	$scope.locations = [];
    NgMap.getMap().then(function(map) {
        $rootScope.myLoc = map.center.lat() + ',' + map.center.lng();
        $rootScope.mapDetails = map; 
        MapService.setMyLocation($rootScope.myLoc,function(data) {
            console.log(data);
        });
        MapService.getJob().then(function(res){
               console.log(res);
               for(var i = 0; i<res.data.length;i++) {
                $scope.locations.push(res.data[i].Location);
               }
              // document.getElementById("fff").click();
               console.log($scope.locations);
               setTimeout(function(){
                        //$rootScope.myLoc = $rootScope.mapDetails.center.lat() + ',' + $rootScope.mapDetails.center.lng();
                        $rootScope.allDirections = $rootScope.mapDetails.directionsRenderers;
                        console.log("All directions", $rootScope.mapDetails.directionsRenderers);
                        console.log("My loc", $rootScope.myLoc);
               },2000);
               
        }); 
    });
    
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
                document.getElementById("fff").click();
                //$rootScope.$emit("locChange", {"indexVal":+audiotext - 1});  
                setTimeout(function(){
                    $scope.searchMapText(+audiotext);
                },1000);
                
            } else {
                $rootScope.speeckToUser({"text":"Location not available"})
            }
        } else if (audiotext.indexOf("direction for") > -1) {
            audiotext = audiotext.split("direction for");
            if(audiotext.length > 1 && audiotext[1] != "") {
                audiotext = audiotext[1].trim();
                $scope.indexVal = +audiotext - 1;
                document.getElementById("fff").click();
                setTimeout(function(){
                    $scope.searchRouteText(+audiotext);
                },1000);
            } else {
                $rootScope.speeckToUser({"text":"directions not available"})
            }
            
        } else {
            $rootScope.speeckToUser({"text":"Audio text"})
        }
    }
    
    $scope.searchRouteText = function(text) {
        var matchIndex = 1000;
        if(!isNaN(text)) {
            matchIndex = +Object.keys($rootScope.allDirections)[0];
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
            matchIndex = +Object.keys($rootScope.allDirections)[0];
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
    		if($rootScope.speeckToUser){
                console.log("inside speech", $rootScope.allDirections[0]);
                 $rootScope.speeckToUser({"text":"Distance to your destination is " + $rootScope.allDirections[0].directions.routes[0].legs[0].distance.text + 
                 	" and total time to reach is " + $rootScope.allDirections[0].directions.routes[0].legs[0].duration.text})  
            }
    	}
   });
})