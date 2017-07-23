
(function(){
  'use strict';
  console.log("main");
  	angular.module('hackathonApp').controller('mainController',['$scope',function($scope){
  		console.log("Main Controller...");
  		$scope.headerShow = true;
		  $scope.footerShow = true;
		  $scope.speechInput = "purchased product list";
			
			$scope.isListening = false;

			$scope.micImg = "assets/icons/ic_mic.png";
			
  		$scope.displayHeaderFooter = function(_header,_footer){
  			$scope.headerShow = _header == undefined?true:_header;
  			$scope.footerShow = _footer == undefined?true:_footer;
			}
			
			$scope.enableMic = function(){
				$scope.isListening = !$scope.isListening;

				$scope.micImg = $scope.isListening?"assets/icons/ic_mic_red.png":"assets/icons/ic_mic.png";
				
			}

			$scope.sendRequest = function(){
				$scope.addNewChart($scope.speechInput);
			}
			$scope.addNewChart = function(_request){
				$scope.$broadcast('onNewCard', {speechInput: _request});

			}

  	}]);
  })();