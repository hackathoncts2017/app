
 (function() {
    'use strict';
    angular.module('hackathonApp').service('appService', ['$q', '$http',
       function appService($q, $http) {
       		return {
       			getCall: function(_url) {

              var deferred = $q.defer();

              //return $http.jsonp(_url);
             

              /*$.ajax({
                  url: _url,
                  jsonp: "callback",
                  dataType: "json",
                  success: function( response ) {
                      deferred.resolve(response);
                  },
                  error:function(){
                      deferred.reject();
                  }
              });*/

              $.ajax({
                url: _url,
                type: 'GET',
                dataType: 'json',
                headers: {
                  //WRITE IF THEIR HAVE SOME HEADER REQUEST OR DATA
                },
                crossDomain: true,
                success: function (data, textStatus, xhr) {
                  console.log(data);
                  deferred.resolve(data);
                },
                error: function (xhr, textStatus, errorThrown) {
                  deferred.reject();
                  console.log(errorThrown);
                }
              });
              return deferred.promise;

              // var headerObj = {"Access-Control-Allow-Origin":"*","Content-Type":"application/json"}

              // $http({
              //      method: 'GET',
              //      url: _url,
              //      timeout: 5000,
              //      headers: headerObj
              //   }).then(function(response) {
              //      if (response.status >= 200 && response.status < 300) {
              //         deferred.resolve(response.data);
              //      }else{
              //       deferred.reject();
              //      }
              //   }, function(err) {
              //      deferred.reject();
              //   });

              // return deferred.promise;
       				
       			}
       		}
       }])
  })();
