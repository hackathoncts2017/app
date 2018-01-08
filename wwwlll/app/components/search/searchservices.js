hackathon.service('SearchService', function($http){
   
   this.searchQuery = function(data,cb) {
		 $http({
			method: 'GET',
			url: 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyDLcZXtAtz7CATMGI71BQlJgkIo5Knce98&part=snippet&q='+data.query,
			//data: JSON.stringify(data),
			headers: {'Content-Type': 'application/json'}
	      }).success(function(res){
			  console.log("dd",res)
				cb(null,res)
		  }, function(res){
			  console.log("dd")
			   cb(true);
		  });
   }
});