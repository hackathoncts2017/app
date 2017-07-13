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
})();