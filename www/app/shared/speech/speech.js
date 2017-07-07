hackathon.controller("SpeechController", function(shared, $state, $scope, $mdSidenav, $mdComponentRegistry,$rootScope) {
	
	$scope.audioinput = function(){
		$scope.speechRecognition = window.plugins && window.plugins.speechRecognition ? window.plugins.speechRecognition : false; 
		//$scope.callcomponent();
		$scope.speechReg();
	}

	$scope.callcomponent = function(){
		//console.log($rootScope.selectedComponent)
		$rootScope.$emit($rootScope.selectedComponent, {"text":"Hi"});
	}
	
	$rootScope.speeckToUser = function(data) {
		if(typeof TTS != "undefined") {
			TTS.speak(data.text, function () {
	           // alert('success');
	        }, function (reason) {
	            //alert(reason);
	        });
    	}
	}
	$scope.speechReg = function(){
		if($scope.speechRecognition) {
			$scope.speechRecognition.isRecognitionAvailable($scope.regconitaionCb);
			$scope.regconitaionCb = function(isAvaliable) {
				if(isAvaliable) {
					$scope.getPermission();
				} else {
					alert("Your device do not have speech recognition");
				}
			};
			
			$scope.getPermission = function() {
				$scope.speechRecognition.hasPermission(function(isPermission) {
					if(isPermission) {
						$scope.listen();
					} else {
						$scope.makePermission();
					}
				});
			}
			$scope.listen = function() {
				let options = {
				  language:"en-US",
				  matches:1,
				  prompt:"",
				  showPopup:true,
				  showPartial:true
				}
				$scope.speechRecognition.startListening($scope.successCb,function(){console.log("ddd")},options)	
			}
			$scope.successCb = function(data) {
				var result= data[0];
				$rootScope.speeckToUser({"text":result})
				
			}
			$scope.makePermission = function() {
				$scope.speechRecognition.requestPermission(function(){
					$scope.listen();
				}, function error() {
					alert("You have denyed a permission")
				})
			}
		}
	}
	
});