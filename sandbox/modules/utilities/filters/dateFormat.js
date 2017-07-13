
(function(){
  'use strict';
  	angular.module('hackathonApp').filter("dateFormat", function() {
	      return function(input, isfullMonth) {
	         input = (typeof(input) == "string") ? input : '' + input;
	         var month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	         var full_month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	         var dat = input.split('/');
	         return dat.length>1?dat[0] + 'th ' + (isfullMonth ? full_month[parseInt(dat[1]) - 1] : month[parseInt(dat[1]) - 1]) + ' ' + (dat.length>2?dat[2]:''):input;
	      };
   })
 })();