
(function(){
  'use strict';
  	angular.module('hackathonApp').filter('customSorter', function() {
	  function CustomOrder(item) {
	    switch(item) {
	      case 'A_Class':
	        return 2;

	      case 'B_Class':
	        return 1;

	      case 'C_Class':
	        return 3;
	    }  
	  }

  return function(items, field) {
  debugger;
    var filtered = [];
    angular.forEach(items, function(item) {
      filtered.push(item);
    });
    filtered.sort(function (a, b) {    
      return (CustomOrder(a.class) > CustomOrder(b.class) ? 1 : -1);
    });
    return filtered;
  };
});
 })();