hackathon.service('MapService', function($http){
	//if(localStorage.userDetails == undefined){
		localStorage.userDetails = "{\"id\":3,\"location\":\"44,78\",\"updateOn\":\"2017-07-08T11:29:44.000Z\",\"engineerName\":\"Vignesh\",\"deviceId\":\"52c65734ab2b7a54\"}"
	//}
   this.getJob = function(data) {   
	  var userId = JSON.parse(localStorage.userDetails).id || 1;
	  console.log("userID", userId);
      return $http.get('https://hackathoncts.herokuapp.com/job/list/'+userId).then(function(res){
		return res.data;
	  }, function(res){
		return {error:true};
	  });
   }
   this.sendSMS = function(data,cb) {   
	  $http({
			method: 'POST',
			url: 'https://hackathoncts.herokuapp.com/SMS',
			data: JSON.stringify(request),
			headers: {'Content-Type': 'application/json'}
		}).success(function(res){
			cb(res.data);
		}, function(res){
		   cb(true);
		});
   }
   this.setMyLocation = function(data,cb) {
	   	var userDetails = JSON.parse(localStorage.userDetails),
	   		request = {
			  "id": "" + userDetails.id,
			  "location": data,
			  "name": userDetails.engineerName
			};
		console.log("request",request);
		$http({
			method: 'POST',
			url: 'https://hackathoncts.herokuapp.com/engineer-location/save',
			data: JSON.stringify(request),
			headers: {'Content-Type': 'application/json'}
		}).success(function(res){
			cb(res.data);
		}, function(res){
		   cb(true);
		});
   }
    this.completeJob = function(request,cb) {
	   	var userDetails = JSON.parse(localStorage.userDetails);
	   		request.userId = "" + userDetails.id;
	   		request.status = "C";
		console.log("request",request);
		$http({
			method: 'POST',
			url: 'https://hackathoncts.herokuapp.com/job/completed',
			data: JSON.stringify(request),
			headers: {'Content-Type': 'application/json'}
		}).success(function(res){
			cb(res.data);
		}, function(res){
		   cb(true);
		});
   }
   this.getUserLocation = function(data,cb) {
		$http({
		method: 'POST',
		url: 'https://hackathoncts.herokuapp.com/product/save',
		data: JSON.stringify(data),
		headers: {'Content-Type': 'application/json'}
		}).success(function(res){
		  console.log("dd",res)
			cb(res.data)
		}, function(res){
		  console.log("dd")
		   cb(true);
		});
   }
});