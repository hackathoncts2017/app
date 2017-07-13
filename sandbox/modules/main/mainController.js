
(function(){
  'use strict';
  console.log("main");
  	angular.module('hackathonApp').controller('mainController',['$scope',function($scope){
  		console.log("Main Controller...");
  		$scope.headerShow = true;
  		$scope.footerShow = true;
  		
  		$scope.displayHeaderFooter = function(_header,_footer){
  			$scope.headerShow = _header == undefined?true:_header;
  			$scope.footerShow = _footer == undefined?true:_header;
  		}
  	}]);
  })();