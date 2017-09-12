hackathon.service('DashboardService', function($http){
   this.getWeather = function(data) {   
	   
      return $http.post('http://app-4524d925-398c-4eff-bdf6-189b0b873555.cleverapps.io/dashboard', data).then(function(res){
      	
		return res;
	  }, function(res){
		return {error:true};
	  });
   }

  this.getDetails = function(data) {   
	  var userId = JSON.parse(localStorage.deviceDetails).uuid || 1;
	  console.log("userID", userId);
      return $http.get('http://app-4524d925-398c-4eff-bdf6-189b0b873555.cleverapps.io/engineer-location/get?deviceId='+userId).then(function(res){
		return res;
	  }, function(res){
		return {error:true};
	  });
   }
    this.registerComplaint = function(data,cb) {
    	$http({
			method: 'POST',
			url: 'http://app-4524d925-398c-4eff-bdf6-189b0b873555.cleverapps.io/job/save',
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
			url: 'http://app-4524d925-398c-4eff-bdf6-189b0b873555.cleverapps.io/register',
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
      return $http.get('http://app-4524d925-398c-4eff-bdf6-189b0b873555.cleverapps.io/job/list/'+userId).then(function(res){
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