hackathon.controller("ProductController", function(shared, $state, $scope, $mdSidenav, $mdComponentRegistry,ProductService,$rootScope) {
	$scope.productWidth = screen.width - (167);
	$scope.product = [];	
	//console.log(asyn);
	$scope.onStart = true;
	$rootScope.$on("ProductSpeech", function(controller,data){           
		   $scope.audioSplit(data.text);
    });
	$scope.audioSplit = function(audiotext) {
		if(audiotext.indexOf("search for") > -1){
			audiotext = audiotext.split("search for");
			if(audiotext.length > 1 && audiotext[1] != "") {
				audiotext = audiotext[1];
				$scope.searchText(audiotext);
			} else {
				$rootScope.speeckToUser({"text":"please search some product"})
			}
		}
	}
	$rootScope.$on("resetProduct", function(controller,data){
           $scope.product = [];
           $scope.onStart = true;
    });
    $scope.searchText = function(text){
    	$scope.productName = text;
		$scope.onStart = false;
    	$scope.isLoading = true;
    	ProductService.getProduct({"product": text ,"limit": 10}).then(function(res){
			$scope.isLoading = false;
			if(!res.error) {				
				$scope.isLoading = false;
				$scope.product = res.data;
			} else {
				$scope.product = [];
			}
		}); 
	}

})