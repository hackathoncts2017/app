
(function(){
  'use strict';

  	angular.module('ngapp').controller('registerDeviceController',['$scope','$rootScope','$timeout',function($scope,$rootScope,$timeout){
        $scope.initRegcall = true;

        $scope.showSuccess = false;
        $scope.enableMic = function(){

        }

        $scope.registerDevice = function(){
            $scope.initRegcall = !$scope.initRegcall;
            if($scope.initRegcall === true){
                var registerNumber =  $("register-field").text();
                if(isNaN(registerNumber)){
                    alert("Register Number is not Valid");
                }else if(registerNumber === "24352"){
                    $timeout(function(){
                        alert("Register Number is not Valid");
                        $scope.showSuccess = true;
                    },1500);
                }else{
                    
                }
            }
        }
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