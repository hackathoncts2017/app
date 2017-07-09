hackathon.controller("MapController", function(shared, $state, $scope, $mdSidenav, $mdComponentRegistry,NgMap,$rootScope,$http,MapService) {
	$scope.locations = [];
    $scope.feedbackflag = false;
    $scope.starFlag = false;
    $scope.jobDetails = {}
    $scope.jobIdMapping = {};
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
    NgMap.getMap().then(function(map) {
        $rootScope.myLoc = map.center.lat() + ',' + map.center.lng();
        $rootScope.mapDetails = map; 
        MapService.setMyLocation($rootScope.myLoc,function(data) {
            console.log(data);
        });
        MapService.getJob().then(function(res){
            console.log(res);
            for(var i = 0; i<res.data.length;i++) {
                if(res.data[i].status == "I") {
                    $scope.locations.push(res.data[i].Location);
                    $scope.jobIdMapping[i + 1] = res.data[i].id;
                }
            }
            console.log($scope.locations);
            setTimeout(function(){
                $rootScope.allDirections = $rootScope.mapDetails.directionsRenderers;
                console.log("All directions", $rootScope.mapDetails.directionsRenderers);
                console.log("My loc", $rootScope.myLoc);
            },2000);
        }); 
    });
    
    $rootScope.$on("MapSpeech", function(controller,data){           
           $scope.mapAudioSplit(data.text);
    });
    
    $scope.mapAudioSplit = function(audiotext) {
        if(audiotext.indexOf("details of") > -1){
            audiotext = audiotext.split("details of");
            if(audiotext.length > 1 && audiotext[1] != "") {
                audiotext = audiotext[1].trim();
                $scope.indexVal = +audiotext - 1;
                document.getElementById("fff").click(); 
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
            
        } else if (audiotext.indexOf("completed") > -1) {
            audiotext = audiotext.split("completed");
            if(audiotext.length > 1 && audiotext[0] != "") {
                audiotext = audiotext[0].replace('job','').trim();
                setTimeout(function(){
                    $scope.jobCompletedText(audiotext, "completed");
                },1000);
            } else {
                $rootScope.speeckToUser({"text":"Job not available"})
            }
        } else if ($scope.starFlag) {
            $scope.starFlag = false;
            $scope.jobCompletedText(audiotext,"rating");
        } else if ($scope.feedbackflag) {
            $scope.feedbackflag = false;
            $scope.jobCompletedText(audiotext,"feedback");
        } else if (audiotext.indexOf("view") > -1) {
            audiotext = audiotext.split("view");
            if(audiotext.length > 1 && audiotext[0] != "") {
                audiotext = audiotext[0].trim();
                if(audiotext == "map") {
                    document.getElementsByClassName("gm-style-mtc")[0].childNodes[0].click()
                } else {
                    document.getElementsByClassName("gm-style-mtc")[1].childNodes[0].click()
                }
            }
        } else {
            $rootScope.speeckToUser({"text":"Sorry. Please try again"})
        }
    }
    $scope.jobCompletedText = function(text, condition) {
        console.log("spoken work ", text);
        if(condition == "completed") {
            if(isNaN(+text)) {
                text = +$scope.numberMapping[text];
            }
            console.log("job id", text);
            $scope.jobDetails.id = "" + $scope.jobIdMapping[text];
            $scope.starFlag = true;
            $rootScope.speeckToUser({"text":"On a scale of 1 to 5 how would you rate this service"});
        } else if (condition == "rating") {
            if(isNaN(+text)) {
                text = +$scope.numberMapping[text];
            }
            $scope.jobDetails.rating = text;
            $rootScope.speeckToUser({"text":"Thank you for your rating. Please give your valuble feedback"});
            $scope.feedbackflag = true;
        } else if (condition == "feedback") {
            $scope.jobDetails.feedback = text;
            console.log($scope.jobDetails);
            $rootScope.speeckToUser({"text":"Thank you for your valuble feedback"});
            MapService.completeJob($scope.jobDetails, function(res){
                console.log(res);
                $scope.jobIdMapping = {};
                $scope.locations = [];
                for(var i = 0; i<res.length;i++) {
                    if(res[i].status == "I") {
                        $scope.locations.push(res[i].Location);
                        $scope.jobIdMapping[i] = res[i].id;
                    }
                }
                console.log($scope.locations);
                setTimeout(function(){
                    document.getElementById("fff").click(); 
                    var id = +Object.keys($rootScope.allDirections)[0];
                    $rootScope.speeckToUser({"text":"Distance to your destination is " + $rootScope.allDirections[id].directions.routes[0].legs[0].distance.text + 
                    " and total time to reach is " + $rootScope.allDirections[id].directions.routes[0].legs[0].duration.text})
                },2000);
            }); 
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
    		if($rootScope.speeckToUser &&  $rootScope.allDirections[0] &&  $rootScope.allDirections[0].directions){
                console.log("inside speech", $rootScope.allDirections[0]);
                 $rootScope.speeckToUser({"text":"Distance to your destination is " + $rootScope.allDirections[0].directions.routes[0].legs[0].distance.text + 
                 	" and total time to reach is " + $rootScope.allDirections[0].directions.routes[0].legs[0].duration.text}) 
            } 
    	}
   });
})