
(function(){
  'use strict';

  	angular.module('hackathonApp').controller('homeController',['$scope','homeModel','appService','$window','appconfig',function($scope,homeModel,appService,$window,appconfig){
  		
  		$scope.sortOptions=["Please select","Sort by sport car","Sort by normal car","Sort by manufacturer"];
      $scope.priceSortOptions = ["Price low","Price High"];
  		$scope.selectedOption = "";
      $scope.manufacturerSortBy = "";
      $scope.soryByPrice = "price";
      $scope.priceOption = "";

     
      $scope.productDetail;
      $scope.manufacturer;
      $scope.modelDetails;

      homeModel.getInitData(appconfig.baseURL+'raw/jMPJ7F5K').then(function(response){

        
        $scope.productDetail = response;
        
      },function(error){
        console.log("got Error");
      });

      $scope.sortManufacturer = function(){
        var selOption = $scope.selectedOption == ""? this.selectedOption == ""?"Please select":this.selectedOption:$scope.selectedOption;
        switch(selOption){
            case 'Please select':
              $scope.manufacturerSortBy = "";
            break;
            case 'Sort by sport car':
              $scope.manufacturerSortBy = "-isSportCarManufacturer";
            break;
            case 'Sort by normal car':
              $scope.manufacturerSortBy = "-isNormalCarManufacturer";
            break;
            case 'Sort by manufacturer':
              $scope.manufacturerSortBy = "manufacturer";
            break;
        }
      };

      $scope.sortPrice = function(){
        var selOption = $scope.priceOption == ""? this.priceOption == ""?"Price low":this.priceOption:$scope.priceOption;
        switch(selOption){
          case 'Price low':
            $scope.soryByPrice = "price";
          break;
          case 'Price High':
            $scope.soryByPrice = "-price";
          break;
        }
      }

      $scope.handleVehicleDetail = function(_url){
          homeModel.getModelsList(_url).then(function(response){
              $scope.modelDetails = response;
          },function(error){
              console.log("got Error");
          });
      }
      
      $scope.launchReview = function(_url){
        $window.open(_url, '_blank');
      }


  		$scope.moreDetails = function(_link){
  			   homeModel.getManufacturerList(_link).then(function(response){
              $scope.manufacturer = response;
          },function(error){
              console.log("got Error");
          });
  		}

  	}]);
  })();