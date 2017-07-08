hackathon.controller("ProductController", function(shared, $state, $scope, $mdSidenav, $mdComponentRegistry,ProductService,$rootScope) {
	$scope.productWidth = screen.width - (167);
	$scope.product = [];	
	//console.log(asyn);
	$scope.onStart = true;
	$rootScope.$on("ProductSpeech", function(controller,data){           
		   $scope.audioSplit(data.text);
    });	 
	$scope.audioSplit = function(audiotext) {
		var keyWords = ["search for","select product","order"]
		if(audiotext.indexOf(keyWords[0]) > -1){
			audiotext = audiotext.split(keyWords[0]);
			if(audiotext.length > 1 && audiotext[1] != "") {
				audiotext = audiotext[1];
				$scope.searchText(audiotext);
			} else {
				$rootScope.speeckToUser({"text":"please search some product"})
			}
		} else if(audiotext.indexOf(keyWords[1]) > -1) {
			audiotext = audiotext.split(keyWords[1]);
			$scope.selectedProduct  = audiotext[1];
			$scope.selectedProduct = Number($scope.selectedProduct);
			if( 0 < $scope.selectedProduct &&  $scope.selectedProduct< 11) {
				$rootScope.speeckToUser({"text":"can you tell me how many product in product " + $scope.selectedProduct});		
			} else {
				$rootScope.speeckToUser({"text":"Select product from 0 to 10"});	
			}
				
		} else if(audiotext.indexOf(keyWords[2]) > -1) {
			audiotext = audiotext.split(keyWords[2]);
			audiotext = audiotext[1].trim();
			audiotext = audiotext.split(" ")[0];			
			$scope.productCnt  = audiotext;
			$rootScope.speeckToUser({"text":"You have ordered " + $scope.productCnt+ " product in product " + $scope.selectedProduct +". we request admin regarding this amd we will get back you soon"});
			$scope.apiCall();
		} else {
			$rootScope.speeckToUser({"text":"please Check your keyword"})
		}
	}
	$scope.apiCall =function() {
		var selPro = $scope.product[$scope.selectedProduct - 1]
		var productDesc = {
		  "productId": selPro.productBaseInfo.productIdentifier.productId,
		  "productName": selPro.productBaseInfo.productAttributes.title,
		  "productUrl": selPro.productBaseInfo.productAttributes.productUrl,
		  "productCount": Number($scope.productCnt),
		  "orderBy": JSON.parse(localStorage.userDetails).id.toString(),
		  "orderFor": "USER_NAME",
		  "Location": "LOCATION"
		};
		ProductService.saveProduct(productDesc,function() {
			$scope.product = [];
			$scope.onStart = true;
		})
		//$rootScope.speeckToUser({"text":"api"})
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