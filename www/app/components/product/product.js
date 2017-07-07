hackathon.controller("ProductController", function(shared, $state, $scope, $mdSidenav, $mdComponentRegistry,ProductService,$rootScope) {
	$scope.productWidth = screen.width - (167);
	$scope.product = [];	
	//console.log(asyn);
	$scope.onStart = true;
	$rootScope.$on("ProductSpeech", function(controller,data){
           console.log(data);
           $scope.searchText("lenova k6");
    });
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
			$scope.product = res.data;
		}); 
	}

})