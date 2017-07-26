hackathon.controller("SpeechController", function(shared, $state, $scope, $mdSidenav, $mdComponentRegistry,$rootScope,$mdToast) {
	
	$scope.audioinput = function(){
		$scope.speechRecognition = window.plugins && window.plugins.speechRecognition ? window.plugins.speechRecognition : false; 
		//$scope.callcomponent();
		$scope.speechReg();
	}
	$scope.showaudio = true;
	 $scope.$watch('seachtext', function (newValue, oldValue) {
        if(newValue != "" && newValue != undefined){
        	$scope.showaudio = false;
        	if(!$scope.userClick) {
        		$scope.autoComplete();
        	} else {
        		setTimeout(function(){
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
		$rootScope.$emit($rootScope.selectedComponent, {"text":audiotext});
		
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
	$scope.keyWordText = ["Reset","Register new complaint","Where am i?","Show monthly report","Show yearly report","Show weekly report","Show daily report","Change to line chart","Change to spline chart","Change to area chart","Change to areaspline chart","Change to bubble chart","Change to column chart","How about today weather","Track engineer","Assign job","refresh","Details of job ","Engineer","Direction for job","Started for job","Reached","Completed","Feedback","Rating","Satellite View","Map view","Order product","Close product","Back product","Search for","Select product","Order","Search for","Navigate to dashboard","Navigate to map","Navigate to product","Navigate to search","Navigate to order","Switch to admin view","Switch to user view","Switch to engineer view","Switch to normal view"];
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
            .position('bottom right')
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
				$mdToast.show(
                    $mdToast.simple()
                    .textContent(text)
                    .position('bottom right')
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
