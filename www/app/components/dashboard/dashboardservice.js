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

   this.getJob = function(data) {   
	  var userId = JSON.parse(localStorage.deviceDetails).id;
	  console.log("userID", userId);
      return $http.get('https://hackathoncts.herokuapp.com/job/list/'+userId).then(function(res){
		return res.data;
	  }, function(res){
		return {error:true};
	  });
   }

   
  
});