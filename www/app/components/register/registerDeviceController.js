
(function(){
  'use strict';

  	angular.module('ngapp').controller('registerDeviceController',['$scope','$timeout',function($scope,$timeout){
        //$scope.$parent.displayHeaderFooter(false,false);
        $scope.initRegcall = true;
        $scope.isListening = false;
        $scope.showSuccess = false;
        $scope.enableMic = function(){

        }

        $scope.afterHide = function(){
            alert("Start your successfull registration screen.");
        }

        $scope.registerDevice = function(){
            $scope.initRegcall = !$scope.initRegcall;
            if($scope.initRegcall === true){
                var registerNumber =  $("register-field").text();
                if(isNaN(registerNumber)){
                    alert("Register Number is not Valid");
                }else if(registerNumber === "23456"){
                    $timeout(function(){
                        $scope.showSuccess = true;
                    },1500);
                }
            }
        }

        $scope.enableMicSpeech = function(){
            console.log("Trigerring....");
            $scope.isListening = !$scope.isListening;
            $scope.micImg = $scope.isListening?"assets/icons/ic_mic_red.gif":"assets/icons/ic_mic.png";
        }

        $scope.successMsg = [{header:'Registration Successful',content:'Welcome, You have successfully registed your device with Digital Service Assistance. Now all your daily service calls will be in your finger tips.'},
        {header:'Why Digital Service Assistance?',content:'Digital service assistance is to enhance the quality of service provided by service agents? You can track and update your daily service calls. Get technical assistance from high technical assistance and get video suggestion from global portal. All your needed products can be raised request from your place itself.'},
        {header:'How to check all assigned tasks?',content:'Digital service assistance is to enhance the quality of service provided by service agents? You can track and update your daily service calls. Get technical assistance from high technical assistance and get video suggestion from global portal. All your needed products can be raised request from your place itself.'},
        {header:'How to get technical assistance?',content:'Digital service assistance is to enhance the quality of service provided by service agents? You can track and update your daily service calls. Get technical assistance from high technical assistance and get video suggestion from global portal. All your needed products can be raised request from your place itself.'},
        {header:'How to place order for new products?',content:'Digital service assistance is to enhance the quality of service provided by service agents? You can track and update your daily service calls. Get technical assistance from high technical assistance and get video suggestion from global portal. All your needed products can be raised request from your place itself.'},
        {header:'Commands',content:'Digital service assistance is to enhance the quality of service provided by service agents? You can track and update your daily service calls. Get technical assistance from high technical assistance and get video suggestion from global portal. All your needed products can be raised request from your place itself.'},]
       
  	}]);
    
      angular.module('ngapp').directive('splitheight', function($compile, $timeout) {
      return {
         restrict: 'EA',
         priority: 1,
         replace: false,
         compile: function(element, attr) {
            return {
               pre: function(scope, iElement, iAttrs, controller) {
                  var headerHei = 56;
                  var contentHei = $(window).height();
                  var percentHei = contentHei / 100;
                  var splitHeight = iAttrs.splitheight;

                  var headerHei = parseInt(iAttrs.headerhei);
                  var footerHei = parseInt(iAttrs.footerhei);
                  var spliHeiVal = percentHei * splitHeight;
                  
                  $(element).height(spliHeiVal - (headerHei + footerHei ));
               },
               post: function(scope, iElement, iAttrs, controller) {
                  $compile(element.contents())(scope);
               }
            };
         }
      };
   });

   angular.module('ngapp').directive('registerField', function($compile, $timeout) {
      return {
         restrict: 'EA',
         priority: 1,
         transclude:true,
        link: function(scope, element, attr) {
            element.bind('focus', function customValidator() {
                 var range,selection;
                if (document.body.createTextRange) {
                range = document.body.createTextRange();
                range.moveToElementText(this);
                range.select();
                } else if (window.getSelection) {
                selection = window.getSelection();
                range = document.createRange();
                range.selectNodeContents(this);
                selection.removeAllRanges();
                selection.addRange(range);
                }
            });
            element.on('keydown', function(event) {
                $(this).text('');
            });
            element.on('keyup', function(event) {
                if($(this).text() == '' || isNaN($(this).text())){
                    $(this).text('0');
                }
                $(this).next('register-field').focus();
            });
        }
      };
   });
  })();
