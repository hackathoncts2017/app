hackathon.controller("UserController", function(shared, $state, $scope, $mdSidenav, $mdComponentRegistry,$rootScope,DashboardService) {
	$scope.noTicket = false;
	$scope.loader = true;
	$scope.joblist = [];
	$rootScope.assignedEngId = -1;
	$scope.userJob = function() {
		DashboardService.userJob().then(function(res){
			if(res.data.length ==0) {
				$scope.loader = false;
				$scope.noTicket = true;
			} else {
				$scope.loader = false;
				$scope.joblist = res.data;
				console.log("joblist",res.data);
				var flag = false;
				for(var i = 0; i <res.data.length; i++) {
					if(res.data[i].status == "I" && res.data[i].userId != "") {
						flag = true;
						$rootScope.assignedEngId = res.data[i].userId;
					}
				}
				if(flag) {
					$rootScope.loadMap();
				}

			}
		})
	}
});