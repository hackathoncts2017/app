
/* MODEL will fetch the data from server with the help of app service and manipulate fetch data if needed.*/

(function() {
    'use strict';

    angular.module('hackathonApp').factory('homeModel', ['$q', 'appService', '$timeout', function($q, appService,$timeout) {


           var  modelDatas = {'iiz03689':{"ferrariCars":[{"name":"Ferrari Daytona","class":"Sport","price":"50,0000"},{"name":"Ferrari 275","class":null,"price":"10,0000"},{"name":"Ferrari F430","class":"Roadster","price":"20,0000"}]},
                               '0PaWBJcQ': {"lotusCars":[{"name":"Evora 400","class":"Roadster","price":"35,0000"},{"name":"Exige 350","class":"Sport","price":"55,9000"},{"name":"Elise","class":"Roadster","price":"29,9000"}]},
                               'NNNjeEXt':{'cars':[{"manufacturer": "Ferrari","founded": "13/09/1939","icon": null,"isSportCarManufacturer": true,"isNormalCarManufacturer": true,"review": "http://www.telegraph.co.uk/cars/ferrari/","details": "http://pastebin.com/raw/iiz03689"}, {"manufacturer": "Lotus","founded": "1952","icon": null,"isSportCarManufacturer": true,"isNormalCarManufacturer": true,"review": "http://www.telegraph.co.uk/cars/lotus/","details": "http://pastebin.com/raw/0PaWBJcQ"}, {"manufacturer": "Jaguar","founded": "04/09/1922","icon": null,"isSportCarManufacturer": false,"isNormalCarManufacturer": true,"review": "http://www.telegraph.co.uk/cars/jaguar/","details": null}, {"manufacturer": "Ford","founded": "16/08/1903","icon": null,"isSportCarManufacturer": false,"isNormalCarManufacturer": true,"review": "http://www.telegraph.co.uk/cars/ford/","details": null}, {"manufacturer": "Mercedes-Benz","founded": "1962","icon": null,"isSportCarManufacturer": true,"isNormalCarManufacturer": true,"review": "http://www.telegraph.co.uk/cars/mercedes-benz/","details": null}]},
                               'jMPJ7F5K':{'vehicles':[{"type": "car","details": "http://pastebin.com/raw/NNNjeEXt","icon": null}, {"type": "Bus","details": null,"icon": null}, {"type": "Bike","details": null,"icon": null}]}}

           return {

            /* getInitData will fetch the available product catalog*/

            getInitData: function(_url) {
                var deferred = $q.defer();
                
                /*
                appService.getCall(_url).then(function(response) {
                    deferred.resolve(response.data);
                }, function(error) {
                    deferred.reject();
                })*/

                $timeout(function() {
                    if(_url){
                       var idRef = _url.substring(_url.lastIndexOf('/')+1,_url.length);
                        var obj = modelDatas[idRef]
                        deferred.resolve(obj[Object.keys(obj)[0]]);
                    }
                    
                }, 10);

                return deferred.promise;
            },

            getManufacturerList: function(_url) {
                var deferred = $q.defer();

                /*appService.getCall(_url).then(function(response) {
                    deferred.resolve(response.data);
                }, function(error) {
                    deferred.reject();
                })*/

                $timeout(function() {
                    if(_url){
                       var idRef = _url.substring(_url.lastIndexOf('/')+1,_url.length);
                        var obj = modelDatas[idRef]
                        deferred.resolve(obj[Object.keys(obj)[0]]);
                    }
                    
                }, 10);

                return deferred.promise;
            },

            getModelsList: function(_url) {
                var deferred = $q.defer();
                

                $timeout(function() {
                    if(_url){
                        var idRef = _url.substring(_url.lastIndexOf('/')+1,_url.length);
                        var obj = modelDatas[idRef]
                        deferred.resolve(obj[Object.keys(obj)[0]]);
                    }
                    
                }, 10);

                /*appService.getCall(_url).then(function(response) {
                    deferred.resolve(response.data);
                    }, function(error) {
                    deferred.reject();
                })*/

               return deferred.promise;
            }

        }

    }]);
})();