hackathon.service('SearchService', function($http){
   
   this.searchQuery = function(data,cb) {
		 $http({
			method: 'POST',
			url: 'http://hackathoncts.herokuapp.com/search-youtube',
			data: JSON.stringify(data),
			headers: {'Content-Type': 'application/json'}
	      }).success(function(res){
			  console.log("dd",res)
				cb(null,res.data)
		  }, function(res){
			  console.log("dd")
			   cb(true);
		  });
   }
});