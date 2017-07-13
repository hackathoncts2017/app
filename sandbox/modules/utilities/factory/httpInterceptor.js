(function() {
   'use strict';
   angular.module('hackathonApp').factory('httpRequestInterceptor', function () {
  return {
    request: function (config) {
      config.headers['Access-Control-Allow-Origin'] = "*";
      config.headers['Accept'] = 'application/json;odata=verbose';
      return config;
    }
  };
});
})();