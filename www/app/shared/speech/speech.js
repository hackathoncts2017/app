hackathon.controller("SpeechController", function(shared, $state, $scope, $mdSidenav, $mdComponentRegistry,$rootScope) {
	
	$scope.audioinput = function(){
		$scope.speechRecognition = window.plugins && window.plugins.speechRecognition ? window.plugins.speechRecognition : false; 
		//$scope.callcomponent();
		$scope.speechReg();
	}

	$scope.callcomponent = function(audiotext){
		//console.log($rootScope.selectedComponent)
		$rootScope.$emit($rootScope.selectedComponent, {"text":audiotext});
		
	}
	$scope.navigatePage ={
		"dashboard":0,
		"map":1,
		"product":2,
		"search":3
	}
	$rootScope.speeckToUser = function(data,callAudio) {
		console.log("inside speak to");
		if(typeof TTS != "undefined") {
			TTS.speak(data.text, function () {
	           // alert('success');
			   if(callAudio) {
				   $(".audio-btn")[0].click()
			   }
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
				  showPopup:false,
				  showPartial:true
				}
				$scope.speechRecognition.startListening($scope.successCb,$scope.onError,options)	
			}
			$scope.successCb = function(data) {
				var result= data[0];
				result = result.toLowerCase();
				$scope.splitText(result);
				//setTimeout($scope.listen , 1000);
				//$rootScope.speeckToUser({"text":result})
				
			}
			$scope.onError = function(_err){
				//setTimeout($scope.listen , 1000);
			}
			$scope.splitText = function(audioTxt) {
				if(audioTxt.indexOf("navigate") > -1) {
					var navigateKeys = Object.keys($scope.navigatePage);
					var navIndex = null;
					for(var nav = 0 ;nav < navigateKeys.length;nav++) {
						if(audioTxt.indexOf(navigateKeys[nav]) > -1){
							navIndex = $scope.navigatePage[navigateKeys[nav]]
							break;
						}
					}
					if(navIndex != null) {
						$rootScope.tabChange(navIndex);
					} else {
						$rootScope.speeckToUser({"text":"please check your page name"})
					}
				} else if(audioTxt.indexOf("call") > -1){
					$("#calladmin")[0].click()
				} else if(audioTxt.indexOf("switch to") > -1){
					audioTxt = audioTxt.split("switch to");
					audioTxt = audioTxt[1].split(" ");
					if(audioTxt.length == 3) {
						audioTxt = audioTxt[1];
						if(audioTxt == "admin"){
							localStorage.userToggle = "admin";
						} else if(audioTxt == "engineer") {
							localStorage.userToggle = "engineer";
						} else if(audioTxt == "user"){
							localStorage.userToggle = "user";
						} else {
							delete localStorage;
						}
						location.reload(0);
					}
				} else {
					$scope.callcomponent(audioTxt);
				}					
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
