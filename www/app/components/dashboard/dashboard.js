hackathon.controller("DashboardController", function(shared, $state, $scope, $mdSidenav, $mdComponentRegistry,$rootScope) {
	$rootScope.$on("DashboardSpeech", function(controller,data){
           console.log(data)
    });
    //$rootScope.$emit("headedText", {"header":"Dashboard"});

})