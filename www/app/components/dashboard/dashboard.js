hackathon.controller("DashboardController", function(shared, $state, $scope, $mdSidenav, $mdComponentRegistry,$rootScope,$timeout, $compile) {
	$rootScope.$on("DashboardSpeech", function(controller,data){
           console.log(data)
    });
    //$rootScope.$emit("headedText", {"header":"Dashboard"});

         $scope.chartConfig = '';
          $scope.charttype = 'column';
          $scope.chartsection = true;

          $scope.chartReports = function(type){
           
          	if(type=='daily'){
          		$scope.dchartConfig = {
          			
            chart: {
                type: $scope.charttype
            },

                    title: {
                        text: 'Daily Reports'
                    },
                    xAxis: {
                        categories: ['Morning(9 am-11.45am)', 'Afternoon(11.46pm - 3.00pm)', 'Evening(3.00pm - 6.00pm)']
                    },
                    plotOptions: {
                    series: {
                    cursor: 'pointer',
                    events: {
                        click: function(event) {
                            
                            $scope.$apply();
                        }
                    }
                }

            },
            
                    series: [{
                        data: [72.9, 99.5, 76.4]
                    }]
                };

                $scope.dailyclass = 'md-primary';
                $scope.weeklyclass = '';
                $scope.monthlyclass = '';
                $scope.yearlyclass = '';
                 $scope.dailychart = true;
                $scope.weeklychart = false;
                $scope.monthlychart = false;
                $scope.yearlychart = false;
                

            
           


          	}
          	else if(type =='weekly'){
          		
          		
          		$scope.wchartConfig = {
          			chart: {
                type: $scope.charttype
            },
                    title: {
                        text: 'Weekly Reports'
                    },
                    xAxis: {
                        categories: ['sun', 'mon', 'tue','wed','thu','fri','sat']
                    },
                     plotOptions: {
                    series: {
                    cursor: 'pointer',
                    events: {
                        click: function(event) {
                            
                            $scope.$apply();
                        }
                    }
                }
            },
            
                    series: [{
                        data: [72.9, 9.5, 76.4,33.5,12,85]
                    }]
                };
                 $scope.dailyclass = '';
                $scope.weeklyclass = 'md-primary';
                $scope.monthlyclass = '';
                $scope.yearlyclass = '';
                 $scope.dailychart = false;
                $scope.weeklychart = true;
                $scope.monthlychart = false;
                $scope.yearlychart = false;
            
            
          		
          	}
          	else if(type=='monthly'){
          		$scope.mchartConfig = {
          			chart: {
                type: $scope.charttype
            },
                    title: {
                        text: 'Montly Reports'
                    },
                    xAxis: {
                        categories: ['Week1', 'Week2', 'week3','week4']
                    },

                    series: [{
                        data: [72.9, 99.5, 6.4,64.3]
                    }]
                };

            
            $scope.dailyclass = '';
                $scope.weeklyclass = '';
                $scope.monthlyclass = 'md-primary';
                $scope.yearlyclass = '';
                $scope.dailychart = false;
                $scope.weeklychart = false;
                $scope.monthlychart = true;
                $scope.yearlychart = false;
          	}
          	else if(type=='yearly'){
          		$scope.ychartConfig = {
          			chart: {
                type: $scope.charttype
            },
                    title: {
                        text: 'yearly Reports'
                    },
                    xAxis: {
                        categories: ['Jan', 'Feb', 'Mar','Apr','May','Jun','July','Aug','Sep','oct','Nov','Dec']
                    },

                    series: [{
                        data: [72.9, 14,74,43,87,35,99.5,112,76.4,21,67,88]
                    }]
                };

            
                $scope.dailyclass = '';
                $scope.weeklyclass = '';
                $scope.monthlyclass = '';
                $scope.yearlyclass = 'md-primary';
                 $scope.dailychart = false;
                $scope.weeklychart = false;
                $scope.monthlychart = false;
                $scope.yearlychart = true;
          		
          	}

          	
          

          }; 



})