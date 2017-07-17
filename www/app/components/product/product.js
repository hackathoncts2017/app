hackathon.controller("ProductController", function(shared, $state, $scope, $mdSidenav, $mdComponentRegistry,ProductService,$rootScope,$mdDialog,mainService) {
	$scope.productWidth = screen.width - (167);
	$scope.product = [];
	$scope.productAdmin = [];
	$scope.isAdminLoad = true;
	$scope.isAdmin = false;
	if(localStorage.deviceDetails) {
		var deviceDetails =JSON.parse(localStorage.deviceDetails);
        console.log(deviceDetails);
		mainService.deviceDetails(deviceDetails).then(function(res) {
			if(!res.error) {
                console.log("resposnes",res);
				$scope.isAdmin = res.data[0].isAdmin == "0"?false:true;				
				if($scope.isAdmin){
					$scope.getAdminProduct();
				}
				//localStorage.userDetails = JSON.stringify(res.data[0]);
			}
		});
	}
	//$scope.isAdmin = JSON.parse(localStorage.userDetails).isAdmin == "0"?false:true	
	//console.log(asyn);
	$scope.onStart = true;
	$rootScope.$on("ProductSpeech", function(controller,data){           
		   $scope.audioSplit(data.text);
    });	
    $scope.getAdminProduct = function() {
    	ProductService.getAdminProduct(function(err,res){
    		if(!err) {
    			$scope.productAdmin = res;
    		} else {
    			$scope.productAdmin = [];
    			$scope.noData = true;
    		}
    		$scope.isAdminLoad = false;
    	})
    }
    //$scope.productPopURL = "";
    $scope.showPopUp = false;
    $scope.productShow =function(url){
    	document.getElementById("product-frame").src = url;
    	//$scope.productPopURL = url;
    	$scope.showPopUp = true;
		document.getElementById("fff").click();
    }
    $scope.closePopup =function() {
    	$scope.showPopUp = false;
		document.getElementById("fff").click();
    }
	$scope.audioSplit = function(audiotext) {
		if(!$scope.isAdmin) {
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
					$rootScope.speeckToUser({"text":"can you tell me how many products you want to order"});		
				} else {
					$rootScope.speeckToUser({"text":"Select product from 0 to 10"});	
				}
					
			} else if(audiotext.indexOf(keyWords[2]) > -1) {
				audiotext = audiotext.split(keyWords[2]);
				audiotext = audiotext[1].trim();
				audiotext = audiotext.split(" ")[0];			
				$scope.productCnt  = audiotext;
				$rootScope.speeckToUser({"text":"You have ordered " + $scope.productCnt+ " product in product " + $scope.selectedProduct +". we request admin regarding this and we will get back you soon"});
				$scope.apiCall();
			} else {
				$rootScope.speeckToUser({"text":"please Check your keyword"})
			}
		} else {
			var keyWords = ["order product","close","back"]
			if(audiotext.indexOf(keyWords[0]) > -1){
				audiotext = audiotext.split(keyWords[0]);
				if(audiotext.length > 1 && audiotext[1] != "") {
					audiotext = audiotext[1];
					var selectedProduct = $scope.productAdmin[audiotext - 1];
					$scope.productShow(selectedProduct.productUrl);
				} else {
					$rootScope.speeckToUser({"text":"please select some product"})
				}
			} else if(audiotext.indexOf(keyWords[1]) > -1 || audiotext.indexOf(keyWords[2]) > -1){
				$scope.closePopup();
			} else {
				$rootScope.speeckToUser({"text":"please Check your keyword"})
			}
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
		  "orderFor": "" + $rootScope.jobId,
		  "Location": "LOCATION",
		  "price":selPro.productBaseInfo.productAttributes.maximumRetailPrice.amount.toString(),
		  "image":selPro.productBaseInfo.productAttributes.imageUrls['200x200'] || selPro.productBaseInfo.productAttributes.imageUrls['unknown']
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