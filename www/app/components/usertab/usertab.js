hackathon.controller("UserController", function(shared, $state, $scope, $mdSidenav, $mdComponentRegistry,$rootScope,DashboardService) {
	$scope.noTicket = false;
	$scope.loader = true;
	$scope.joblist = [];
	$scope.userJob = function() {
		DashboardService.userJob().then(function(res){
			if(res.data.length ==0) {
				$scope.loader = false;
				$scope.noTicket = true;
			} else {
				$scope.loader = false;
				$scope.joblist = res.data;
				console.log("joblist",res.data);
			}
		})
	}
});