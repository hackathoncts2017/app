hackathon.controller("ProductController", function(shared, $state, $scope, $mdSidenav, $mdComponentRegistry,ProductService,$rootScope) {
	$scope.productWidth = screen.width - (167);
	$scope.product = [];
	//console.log(asyn);
	ProductService.getProduct({"product": "lenova k6","limit": 10}).then(function(res){
		$scope.product = res.data;
	});
	$rootScope.$on("ProductSpeech", function(controller,data){
           console.log(data)
    });
	
})