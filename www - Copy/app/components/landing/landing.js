
(function(){
  'use strict';

  	angular.module('ngapp').controller('landingController',['$scope','$timeout','$rootScope','$window',function($scope,$timeout,$rootScope,$window){

     
		 $scope.myInterval = 5000;
  $scope.noWrapSlides = false;
  $scope.active = 0;
  var slides = $scope.slides = [{"heading":"My Aide","text":"","id":0},{"heading":"My Aide 1","text":"text 1","id":1},{"heading":"My Aide 2","text":"text 2","id":2}];
  var currIndex = 0;

  $scope.addSlide = function() {
    var newWidth = 600 + slides.length + 1;
   
  };

  $scope.register = function(){
      location.href= "#register";
	 
		$scope.close();
		 $scope.enableSpeech = false;
		 $rootScope.userId = null;
    };

  $scope.randomize = function() {
    var indexes = generateIndexesArray();
    assignNewIndexesToSlides(indexes);
  };

  for (var i = 0; i < 4; i++) {
    $scope.addSlide();
  }

  // Randomize logic below

  function assignNewIndexesToSlides(indexes) {
    for (var i = 0, l = slides.length; i < l; i++) {
      slides[i].id = indexes.pop();
    }
  }

  function generateIndexesArray() {
    var indexes = [];
    for (var i = 0; i < currIndex; ++i) {
      indexes[i] = i;
    }
    return shuffle(indexes);
  }

  // http://stackoverflow.com/questions/962802#962890
  function shuffle(array) {
    var tmp, current, top = array.length;

    if (top) {
      while (--top) {
        current = Math.floor(Math.random() * (top + 1));
        tmp = array[current];
        array[current] = array[top];
        array[top] = tmp;
      }
    }

    return array;
  }
  	}]);
 
   
  })();
