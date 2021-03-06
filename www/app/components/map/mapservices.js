hackathon.service('MapService', function($http, $q){
	//if(localStorage.userDetails == undefined){
		//localStorage.userDetails = "{\"id\":3,\"location\":\"44,78\",\"updateOn\":\"2017-07-08T11:29:44.000Z\",\"engineerName\":\"Vignesh\",\"deviceId\":\"52c65734ab2b7a54\"}"
	//}
   this.getJob = function(data) {
   	var userId = JSON.parse(localStorage.userDetails).id || 1;
	   	if(data) {
	   		userId = data;
	   	}
	  console.log("userID", userId);
      return $http.get('https://hackathoncts.herokuapp.com/job/list/'+userId).then(function(res){
		return res.data;
	  }, function(res){
		return {error:true};
	  });
   }
   this.userJobSearch = function(userId) {
   		return $http.get('http://hackathoncts.herokuapp.com/engineer-location/get?id='+userId).then(function(res){
			return res.data;
		 }, function(res){
			return {error:true};
		 });
   } 
   this.getJobLoc = function() {
   		var userId = JSON.parse(localStorage.userDetails).id || 1;
   		return $http.get('http://hackathoncts.herokuapp.com/job/user/'+userId).then(function(res){
			return res.data;
		 }, function(res){
			return {error:true};
		 });
   }
   this.getEngLocation = function() {
   	 return $q.all({
            eng: $http.get('http://hackathoncts.herokuapp.com/engineer-location/get'),
            user: $http.get('http://hackathoncts.herokuapp.com/job/list/{userId}')
          }).then(function(results) {
          	console.log("sync", results);
          	return [results.eng.data.data, results.user.data.data];
            // $scope.github.users = JSON.stringify(results.users.data, null, 2);
            // $scope.github.repositories = JSON.stringify(results.repos.data, null, 2);
          });
   }
   this.assignJob = function(data,cb) {
   	$http({
			method: 'POST',
			url: 'https://hackathoncts.herokuapp.com/assignJob',
			data: JSON.stringify(data),
			headers: {'Content-Type': 'application/json'}
		}).success(function(res){
			cb(res.data);
		}, function(res){
		   cb(true);
		});
   }
   this.sendSMS = function(data,cb) {   
	  $http({
			method: 'POST',
			url: 'https://hackathoncts.herokuapp.com/SMS',
			data: JSON.stringify(data),
			headers: {'Content-Type': 'application/json'}
		}).success(function(res){
			cb(res.data);
		}, function(res){
		   cb(true);
		});
   }
   this.setMyLocation = function(data,cb) {
   	//localStorage.userDetails = "{\"id\":3,\"location\":\"44,78\",\"updateOn\":\"2017-07-08T11:29:44.000Z\",\"engineerName\":\"Vignesh\",\"deviceId\":\"52c65734ab2b7a54\"}"
	
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