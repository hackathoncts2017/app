hackathon.controller("ProductController", function(shared, $state, $scope, $mdSidenav, $mdToast,$mdComponentRegistry,ProductService,$rootScope,$mdDialog,mainService) {
	$scope.productWidth = screen.width - (167);
	$scope.product = [];
	$scope.productAdmin = [];
	$scope.isAdminLoad = true;
	$scope.isAdmin = false;
	$scope.noData = false;
	$scope.heigthCal = function() {
		$scope.containerHeight = $(document).height() - 130
	}
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
				$scope.noData = false;
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
	$scope.nextitem = 0;
	$scope.audioSplit = function(audiotext) {
		if(!$scope.isAdmin) {
			var keyWords = ["search for","select product","order","cancel","back"];
			if(audiotext.indexOf(keyWords[3]) > -1 || audiotext.indexOf(keyWords[4]) > -1){
				$scope.nextitem = 1;
				$scope.product = JSON.parse(JSON.stringify($scope.Tempproduct));
			}else if(audiotext.indexOf(keyWords[0]) > -1){
				audiotext = audiotext.split(keyWords[0]);
				if(audiotext.length > 1 && audiotext[1] != "") {
					audiotext = audiotext[1];
					$scope.searchText(audiotext);
				} else {
					$rootScope.speeckToUser({"text":"please search some product"})
				}
			} else if(audiotext.indexOf(keyWords[1]) > -1 || $scope.nextitem === 1) {
				if(audiotext.indexOf(keyWords[1]) > -1){
					audiotext = audiotext.split(keyWords[1]);
					$scope.selectedProduct  = audiotext[1];
				} else {
					$scope.selectedProduct  = audiotext;
				}
				
				$scope.selectedProduct = Number($scope.selectedProduct);
				$scope.selectedProduct = $scope.selectedProduct - 1;
				if( 0 < $scope.selectedProduct &&  $scope.selectedProduct< 11) {
					$scope.product = [$scope.product[$scope.selectedProduct]];
					$rootScope.speeckToUser({"text":"can you tell me how many products you want to order"},true);
					$scope.nextitem = 2;
				} else {
					$rootScope.speeckToUser({"text":"Select product from 0 to 10"});	
				}
					
			} else if(audiotext.indexOf(keyWords[2]) > -1 || $scope.nextitem === 2) {
				if(audiotext.indexOf(keyWords[2]) > -1){
					audiotext = audiotext.split(keyWords[2]);
					audiotext = audiotext[1].trim();
					audiotext = audiotext.split(" ")[0];	
				}						
				$scope.productCnt  = audiotext;
				var productName = $scope.Tempproduct[$scope.selectedProduct].productBaseInfo.productAttributes.title
				$rootScope.speeckToUser({"text":"You have ordered " + $scope.productCnt+ " product in product " + productName +". we request admin regarding this and we will get back you soon"});
				$scope.apiCall();
			} else {
				$rootScope.speeckToUser({"text":"please Check your keyword"})
			}
		} else {
			var keyWords = ["order product","close","back","reject"]
			if(audiotext.indexOf(keyWords[0]) > -1){
				audiotext = audiotext.split(keyWords[0]);
				if(audiotext.length > 1 && audiotext[1] != "") {
					audiotext = audiotext[1];
					var selectedProduct = $scope.productAdmin[audiotext - 1];
					$scope.productShow(selectedProduct.productUrl);
				} else {
					$rootScope.speeckToUser({"text":"please select some product"})
				}
			} else if(audiotext.indexOf(keyWords[3]) > -1){
				audiotext = audiotext.split(keyWords[3]);
				if(audiotext.length > 1 && audiotext[1] != "") {
					audiotext = audiotext[1];
					$scope.productAdmin.splice(audiotext - 1,1);
					$rootScope.speeckToUser({"text":"You have successfully rejected ordered product"})
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
		var selPro = $scope.Tempproduct[$scope.selectedProduct - 1]
		var productDesc = {
		  "productId": selPro.productBaseInfo.productIdentifier.productId,
		  "productName": selPro.productBaseInfo.productAttributes.title,
		  "productUrl": selPro.productBaseInfo.productAttributes.productUrl,
		  "productCount": Number($scope.productCnt),
		  "orderBy": JSON.parse(localStorage.userDetails).id.toString(),
		  "orderFor": "" + $rootScope.jobId,
		  "Location": "LOCATION",
		  "price":selPro.productBaseInfo.productAttributes.maximumRetailPrice.amount.toString(),
		  "image":$scope.imagesplit(selPro.productBaseInfo.productAttributes.imageUrls)
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
				var pro = []
				$.each(res.data,function(index,list){
					list.index = index + 1;
					pro.push(list)
				})
				
				$scope.product = pro;
				$scope.Tempproduct = pro;
				$scope.nextitem = 1;
			} else {
				$scope.product = [];
				$scope.Tempproduct = [];
			}
		}); 
	}
	$scope.imagesplit = function(imgaeObj) {
		if(!imgaeObj['200x200']){
			var unknownData = imgaeObj['unknown'];
			unknownData = unknownData.split("-");
			unknownData[unknownData.length - 2] = '200x200';
			unknownData = unknownData.join("-");
			return unknownData;
		} else {
			return imgaeObj['200x200']
		}
	}
	//prod.productBaseInfo.productAttributes.imageUrls['200x200']?prod.productBaseInfo.productAttributes.imageUrls['200x200'] : prod.productBaseInfo.productAttributes.imageUrls['unknown']
})