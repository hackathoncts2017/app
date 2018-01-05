"use strict";

hackathon.service("shared", function(){ // One of The Ways To Share Informations Across the Controllers

    this.info = {
        title: "cordova-angular-angularMaterial-seed",
        auth: "Mario Aleo"
    };
});


hackathon.directive('flipClock', ['$parse', function($parse) {
    return {
      replace: true,
      template: '<div></div>',
      restrict: 'E',
      link: function(scope, element, attr) {

        var optionKeys = [          
          'countdown',
          'clockface'
        ], options = {
          callbacks: {}
        },
          clock,
          callbacks = [
            'destroy', //This callback is triggered when the timer is destroyed
            'create', // This callback is triggered when the clock face is created
            'init', //This callback is triggered when the FlipClock object is initialized
            'interval', //This callback is triggered with each interval of the timer
            'start', //This callback is triggered when the clock is started
            'stop', //This callback is triggered when the clock is stopped
            'reset' // This callback is triggered when the timer has been reset
          ];



        //set options from attributes
        optionKeys.forEach(function(key) {
          if(attr[key]){
            switch(key){
              case 'clockface':
                options['clockFace'] = attr[key];
                break;
              default:
                options[key] = attr[key];
                break;
            }
          }
        });
        var currentDate = new Date();
        var endTime = moment(attr.time).format("YYYY-MM-DDTHH:mm:ss");
         endTime = new Date(endTime);
        //console.log(endTime,currentDate)
       
        var diff = endTime.getTime() / 1000 - currentDate.getTime() / 1000;
       if(diff < 0) {
          diff = 0;
       }
        //init callbacks
        callbacks.forEach(function(callback) {
          if(attr[callback]){
            options.callbacks[callback] = function(){
              $parse(attr[callback])(scope);
            }
          }
        });
        console.log(options)
        //generate clock object
        clock = new FlipClock(element,diff, options);
        //clock = element.FlipClock(options);
      }
    }
  }])