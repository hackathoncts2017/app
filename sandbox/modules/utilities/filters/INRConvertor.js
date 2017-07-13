(function() {
   'use strict';
   angular.module('hackathonApp').filter('INR', function () {        
    return function (input) {
        input = ''+(parseInt(input.split(',').join('')) * 60);
        if (! isNaN(input)) {
            var currencySymbol = 'Rs. ';
            
            var result = input.toString().split('.');

            var lastThree = result[0].substring(result[0].length - 3);
            var otherNumbers = result[0].substring(0, result[0].length - 3);
            if (otherNumbers != '')
                lastThree = ',' + lastThree;
            var output = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
            
            if (result.length > 1) {
                output += "." + result[1];
            }            

            return currencySymbol + output;
        }
    }
});
})();