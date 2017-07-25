(function() {
   'use strict';
   angular.module('hackathonApp').directive('splitheight', function($compile, $timeout) {
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
                  element.height(spliHeiVal - (headerHei + footerHei ));
               },
               post: function(scope, iElement, iAttrs, controller) {
                  $compile(element.contents())(scope);
               }
            };
         }
      };
   });

   angular.module('hackathonApp').directive('htmldatael', function($compile, $timeout) {
      return {
         restrict: 'E',
         priority: 1,
         replace: true,
         transclude:true,
        scope: {
            value: "="
        },
         compile: function(element, attr) {
            return {
               pre: function(scope, iElement, iAttrs, controller) {
                  var itemStr = "";
                  var myVars = scope.value;
                  
                  myVars.map(function(item,index){
                      itemStr += item;
                  });
                    iElement.parent().html(itemStr);
                    
               },
               post: function(scope, iElement, iAttrs, controller) {
                  $compile(element.contents())(scope);
               }
            };
         }
      };
   });
    
   angular.module('hackathonApp').directive('registerField', function($compile, $timeout) {
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