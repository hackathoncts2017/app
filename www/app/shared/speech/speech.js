hackathon.controller("SpeechController", function(shared, $state, $scope, $mdSidenav, $mdComponentRegistry,$rootScope,$mdToast) {
	
	$scope.audioinput = function(){
		$scope.speechRecognition = window.plugins && window.plugins.speechRecognition ? window.plugins.speechRecognition : false; 
		//$scope.callcomponent();
		$rootScope.speechReg();
	}
	$scope.showaudio = true;
	//$scope.enableSpeech = true;
	 $scope.$watch('seachtext', function (newValue, oldValue) {
        if(newValue != "" && newValue != undefined){
        	$scope.showaudio = false;
        	if(!$scope.userClick) {
        		$scope.autoComplete();
        	} else {
        		setTimeout(function(){
					
					//$rootScope.$emit($rootScope.questionSpeech, {"text":newValue});
        			$scope.userClick = false;
        		},1000)
        	}
        } else {        	
        	$scope.showaudio = true;
        	$scope.suggestionText = [];
        }
    });
	$scope.callcomponent = function(audiotext){
		//console.log($rootScope.selectedComponent)
		if(window.location.hash.search("sos") !== -1) {
			if(audiotext == "help") {
				$rootScope.$emit("triggerSOS", {"text":audiotext});
			} else {
				$rootScope.speechReg();
			}
		} else {
			$rootScope.$emit("questionSpeech", {"text":audiotext});
		}
		
		
	}
	$scope.textinput =function() {
		var text = $scope.seachtext;
		$scope.seachtext = "";
		//console.log(text);
		$scope.splitText(text);
	}
	$scope.navigatePage ={
		"dashboard":0,
		"map":1,
		"product":2,
		"search":3
	}
	$scope.userClick = false;
	$scope.keyWordText = ["First aid for Fracture", "First aid for Headache","First aid for Burns","First aid for Heart attack","First aid for Dizziness"];
	$scope.appendInput = function(index){
		$scope.userClick = true;
		$scope.seachtext = $scope.keyWordText[index];		
		$scope.suggestionText = [];
	}
	$scope.autoComplete = function() {
		var text = $scope.seachtext;
		text = text.toString().toLowerCase();
		var suggestionTextElm = [];
		$.each($scope.keyWordText,function(key,value){
			if(value.toLowerCase().indexOf(text) > -1) {
				suggestionTextElm.push({text:value,index:key});
			}
		});
		$scope.suggestionText = suggestionTextElm;
	}
	$scope.clearTextbox = function() {
		$scope.seachtext = "";
	}
	$scope.suggestionText = []
	$rootScope.speeckToUser = function(data,callAudio) {
		console.log("inside speak to");
		$mdToast.show(
            $mdToast.simple()
            .textContent(data.text)
            .position('top right')
            .hideDelay(5000)
        );
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
	$scope.splitText = function(audioTxt) {
		audioTxt = audioTxt.toString().toLowerCase();
		if(audioTxt.indexOf("back") > -1) {
			location.href="#/main";
		} else if(audioTxt.indexOf("navigate") > -1) {
			var navigateKeys = Object.keys($scope.navigatePage);
			var navIndex = null;
			for(var nav = 0 ;nav < navigateKeys.length;nav++) {
				if(audioTxt.indexOf(navigateKeys[nav]) > -1){
					navIndex = $scope.navigatePage[navigateKeys[nav]]
					break;
				}
			}
			if(audioTxt.indexOf("order") > -1){
				location.href="#/order";
			} else if(navIndex != null) {
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
	$rootScope.speechReg = function(){
		$scope.speechRecognition = window.plugins && window.plugins.speechRecognition ? window.plugins.speechRecognition : false; 
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
				$mdToast.show(
                    $mdToast.simple()
                    .textContent(text)
                    .position('top right')
                    .hideDelay(5000)
                );
				//setTimeout($scope.listen , 1000);
				//$rootScope.speeckToUser({"text":result})
				
			}
			$scope.onError = function(_err){
				//setTimeout($scope.listen , 1000);
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