hackathon.controller("SpeechController", function(shared, $state, $scope, $mdSidenav, $mdComponentRegistry,$rootScope) {
	$scope.audioinput = function(){
		$scope.callcomponent();
	}

	$scope.callcomponent = function(){
		//console.log($rootScope.selectedComponent)
		$rootScope.$emit($rootScope.selectedComponent, {"text":"Hi"});
	}

	$rootScope.speeckToUser = function(data) {
		if(TTS) {
			TTS.speak(data.text, function () {
	           // alert('success');
	        }, function (reason) {
	            //alert(reason);
	        });
    	}
	}
});