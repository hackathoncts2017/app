hackathon.service('sosService', function($http){
   this.sendSms = function(data) {   	   
      return $http.get('https://sarvon-cts.000webhostapp.com/sendsms.php?uid=8903639221&pwd=A2258Q&phone='+data.phoneNo+'&msg='+data.msg).then(function(res){      	
		return res;
	  }, function(res){
		return {error:true};
	  });
   }


   
  
});