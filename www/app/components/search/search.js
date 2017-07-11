hackathon.controller("searchController", function(shared, $state, $scope, $mdSidenav, $mdComponentRegistry,SearchService,$rootScope,$mdDialog) {
	$scope.isSearch = false;
	$rootScope.$on("questionSpeech", function(controller,data){           
		   $scope.audioSplitQuestionSpeech(data.text);
    });	
    $scope.audioSplitQuestionSpeech = function(audiotext) {
    	var keyWords = ["search for"]
		if(audiotext.indexOf(keyWords[0]) > -1) {
			audiotext = audiotext.split(keyWords[0]);
			audiotext = audiotext[1].trim();
			$scope.callSearch(audiotext);
		} else {
			$rootScope.speeckToUser({"text":"please Check your keyword"})
		}
    }
    setTimeout(function() {
    	//$scope.callSearch();
    },100);

    $scope.urlData =function() {
    	document.getElementById("video").src = $scope.queryVideo.videoId
    	//return $scope.queryVideo.videoId
    }
    $scope.callSearch = function(text) {
    	$scope.isSearch = true;
    	$scope.isLoading = true;

    	SearchService.searchQuery({"query":text || "cognizant mepz"},function(err,res) {
    		//console.log(err || res)
    		if(!err){
    			var responseData = [];
    			res.items.map(function(videoDetails) {
					responseData.push({
						"videoId":"https://www.youtube.com/embed/"+videoDetails.id.videoId,
						"title":videoDetails.snippet.title,
						"desc":videoDetails.snippet.description
					})
				});
				//console.log(responseData);
				$scope.isLoading = false;
				$scope.queryVideo = responseData[0];
				if($scope.queryVideo){
					console.log($scope.queryVideo.videoId)
					//document.getElementById("video").src = $scope.queryVideo.videoId
				}
    		}
    	})
    }
})