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
         restrict: 'EA',
         priority: 1,
         replace: true,
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

   
})();