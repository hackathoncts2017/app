hackathon.service('DashboardService', function($http){
   this.getWeather = function(data) {   
	   
      return $http.post('https://hackathoncts.herokuapp.com/dashboard', data).then(function(res){
      	
		return res;
	  }, function(res){
		return {error:true};
	  });
   }

  this.getDetails = function(data) {   
	  var userId = JSON.parse(localStorage.deviceDetails).uuid || 1;
	  console.log("userID", userId);
      return $http.get('https://hackathoncts.herokuapp.com/engineer-location/get?deviceId='+userId).then(function(res){
		return res;
	  }, function(res){
		return {error:true};
	  });
   }
    this.registerComplaint = function(data,cb) {
    	$http({
			method: 'POST',
			url: 'https://hackathoncts.herokuapp.com/job/save',
			data: JSON.stringify(data),
			headers: {'Content-Type': 'application/json'}
		}).success(function(res){
			cb(res.data);
		}, function(res){
		   cb(true);
		});
    }
    this.registerUser = function(data, cb) {
    	data.deviceId = JSON.parse(localStorage.deviceDetails).uuid || 1;
    	data.Location = '13,80';
    	data.image = 'user';
    	
   		$http({
			method: 'POST',
			url: 'https://hackathoncts.herokuapp.com/register',
			data: JSON.stringify(data),
			headers: {'Content-Type': 'application/json'}
		}).success(function(res){
			cb(res.data);
		}, function(res){
		   cb(true);
		});
    }
   this.getJob = function(data) {   
	  var userId = JSON.parse(localStorage.userDetails).id;
	  console.log("userID", userId);
      return $http.get('https://hackathoncts.herokuapp.com/job/list/'+userId).then(function(res){
		return res.data;
	  }, function(res){
		return {error:true};
	  });
   }
   this.userJob = function() {
	  	var userId = JSON.parse(localStorage.userDetails).id || 1;
   		return $http.get('http://hackathoncts.herokuapp.com/job/user/'+userId).then(function(res){
			return res.data;
		 }, function(res){
			return {error:true};
		 });
   }

   
  
});