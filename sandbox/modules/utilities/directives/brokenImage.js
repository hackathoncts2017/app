(function() {
   'use strict';
   angular.module('hackathonApp').directive('onError', function() {
  return {
    restrict:'A',
    link: function(scope, element, attr) {
      element.on('error', function() {
         if (attr.src != attr.onError) {
          attr.$set('src', attr.onError);
        }
      })
    }
  }
})
})();