hackathon.controller("DashboardController", function(shared, $state, $scope, $mdDialog, $mdSidenav, $mdComponentRegistry, $rootScope, $timeout, $compile, DashboardService, $http,NgMap) {
    $rootScope.$on("DashboardSpeech", function(controller, data) {
        $scope.dashboardAudio(data.text);
    });
    //$rootScope.$emit("headedText", {"header":"Dashboard"});
    var h = window.innerHeight;
    $scope.chartHeight = h - 310;
    $scope.dashboardData = null;
    $scope.isLoading = true;
    $scope.pendingjobs =[];
     $scope.completedjobs =[];
	 
    $scope.WeatherIcon = 'http://openweathermap.org/img/w/10d.png';
    $scope.dashboardAudio = function(audiotext) {
        var keyWords = ["show", "change to", "weather","change 2","so","change two",];
        if (audiotext.indexOf(keyWords[0]) > -1 || audiotext.indexOf(keyWords[4]) > -1) {
			if(audiotext.indexOf(keyWords[0]) > -1){
				audiotext = audiotext.split(keyWords[0]);
			} else {
				audiotext = audiotext.split(keyWords[4]);
			}            
            if (audiotext.length > 1 && audiotext[1] != "") {
                audiotext = audiotext[1].trim();				
				audiotext = audiotext.split(" ");
				audiotext = audiotext[0];
                $scope.chartReportChange(audiotext);
            } else {
                $rootScope.speeckToUser({
                    "text": "Invalid chart type"
                })
            }
        } else if (audiotext.indexOf(keyWords[1]) > -1 || audiotext.indexOf(keyWords[3]) > -1 ||  audiotext.indexOf(keyWords[5]) > -1) {
			if(audiotext.indexOf(keyWords[1]) > -1){
				audiotext = audiotext.split(keyWords[1]);
			} else if(audiotext.indexOf(keyWords[3]) > -1) {
				audiotext = audiotext.split(keyWords[3]);
			} else {
				audiotext = audiotext.split(keyWords[5]);
			}
            //audiotext = audiotext.split(keyWords[1]);
            if (audiotext.length > 1 && audiotext[1] != "") {
                audiotext = audiotext[1].trim();
				audiotext = audiotext.split(" ");
				audiotext = audiotext[0]
                $rootScope.chartType = audiotext;
                $scope.drawChart(audiotext);
            } else {
                $rootScope.speeckToUser({
                    "text": "Invalid Status"
                });
            }
        } else  if (audiotext.indexOf(keyWords[2]) > -1) {
            audiotext = audiotext.split(keyWords[2]);
            //if (audiotext.length > 1 && audiotext[1] != "") {
                $rootScope.speeckToUser({
                    "text": "Description" + $scope.dashboardData.weather.weather[0].description + "and" + "Humidity" + $scope.dashboardData.weather.main.humidity + "and" + "Temperature" + $scope.dashboardData.weather.main.temp
                });
                //$scope.chartReports(audiotext);
            //} else {
                //$rootScope.speeckToUser({
                 //   "text": "Invalid Command"
                //})
            //}
        } else {
                $rootScope.speeckToUser({
                    "text": "Please check your keyword"
                });
            }
    };
    $scope.getDetails = function() {
        $scope.userdetails = null;
        DashboardService.getDetails().then(function(res) {
            $scope.isLoading = false;
            if (!res.error && res.data.data.length > 0) {
                $scope.userdetails = res.data.data[0];
                $rootScope.isAdmin = res.data.data[0].isAdmin;
                $scope.userdetails.designation = "Senior Executive";
            } else {
                $scope.userdetails = {
                    "id": 1,
                    "location": "44,56",
                    "engineerName": "Saravanan",
                    "designation": "Senior Executive",
                    "deviceId": "c0e9928ff73b8fa1",
                    "image": "saravanan",
                    "isAdmin": "0",
                    "rating": "3"
                };
                $rootScope.isAdmin = "0";
            }
        });
    };
   
     $scope.getjob = function() { 
        if($scope.userdetails.isAdmin == "0") {
            DashboardService.getJob().then(function(res){
            //debugger;              
            for(var i = 0; i<res.data.length;i++) {
                if(res.data[i].status == "I") {
                    $scope.pendingjobs.push(res.data[i]);                            
                }
                else if(res.data[i].status == "C"){
                 $scope.completedjobs.push(res.data[i]);
                }
                }
               $scope.afterRender()
            });
        }
    }
    $scope.locationMap = function() {
        NgMap.getMap().then(function(map) {
        });
    }
    $scope.afterRender = function() {
        var WelcomeText = "Good ",
            hour = moment().format("HH");
        if(hour < 12) {
            WelcomeText += "Morning";
        } else if(hour < 16) {
            WelcomeText += "Afternoon";
        }  else {
            WelcomeText += "Evening";
        }

        WelcomeText += " " + $scope.userdetails.engineerName;
        
        if($scope.userdetails.isAdmin == "1") {
            WelcomeText += " your Executive has " +$scope.dashboardData.panelBox.inprogress;
        } else {
            WelcomeText += " you have " +$scope.pendingjobs.length;
        }
        WelcomeText += " Pending Task Today";
        $rootScope.speeckToUser({
            "text": WelcomeText
        })
		//$(".audio-btn").trigger("click");
		//$("#fff").trigger("click");
        console.log(WelcomeText);
    };
    $scope.weatherReports = function() {
        DashboardService.getWeather({
            "lon": "13",
            "lat": "80",
            "isAdmin": $scope.userdetails.isAdmin == "1" ? true : false
        }).then(function(res) {
            if (!res.error) {
                $scope.dashboardData = res.data.data;

                if($scope.dashboardData.jobdetails) {
                    $scope.dashboardData.panelBox = {completed:0,inprogress:0};
                    $.each($scope.dashboardData.jobdetails,function(index,val){
                         $scope.dashboardData.panelBox.completed += val.JobsCnt;
                         if(val.status = "I"){
                            $scope.dashboardData.panelBox.inprogress = val.JobsCnt;
                         }
                    })
                }
                $scope.WeatherIcon = "http://openweathermap.org/img/w/" + $scope.dashboardData.weather.weather[0].icon + ".png";
                console.log("$scope.WeatherIcon", $scope.WeatherIcon);
                if($scope.userdetails.isAdmin == "1") {
                 $scope.afterRender();
                }
            }
            $rootScope.loadMap();
        });
    };
    $scope.showAlert = function(ev) {
        // Appending dialog to document.body to cover sidenav in docs app
        // Modal dialogs should fully cover application
        // to prevent interaction outside of dialog
        $mdDialog.show($mdDialog.alert().parent(angular.element(document.querySelector('#popupContainer'))).clickOutsideToClose(true).title('Weather Report').textContent("Description: " + $scope.dashboardData.weather.weather[0].description + ", " + "Humidity: " + $scope.dashboardData.weather.main.humidity + ", " + "Temperature: " + $scope.dashboardData.weather.main.temp).ariaLabel('Alert Dialog Demo').ok('Close').targetEvent(ev));
    };
    $scope.chartConfig = '';
    $scope.charttype = 'column';
    $scope.chartsection = true;
    $scope.drawChart = function(type) {
        var chartType = ['line','spline','area','areaspline','column'];
        if(chartType.indexOf(type) > -1){
            $("#chart1").highcharts().update({"chart":{"type":type}})
        } else {
            $rootScope.speeckToUser({
                    "text": "Chart type not allowed"
                });
        }
        
    }
    window.chartReportChange = $scope.chartReportChange = function(report) {
        var isChange = false,
            chartRef = $("#chart1").highcharts(),
            xAxis = [];
        if(report == 'daily') {
            chartRef.series[0].update({"data": [72.9, 99.5, 76.4]},false);
            chartRef.setTitle({text: "Daily Report"});
            xAxis = ['Morning', 'Afternoon', 'Evening'];
            isChange = true;
        } else if (report == 'weekly')  {
            chartRef.series[0].update({"data": [72.9, 9.5, 76.4, 33.5, 12, 85]},false);
            chartRef.setTitle({text: "Weekly Report"});
            xAxis = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
            isChange = true;
        } else if (report == 'monthly') {
            chartRef.series[0].update({"data":[72.9, 99.5, 6.4, 64.3]},false);
            chartRef.setTitle({text: "Monthly Report"});
            isChange = true;
            xAxis = ['Week1', 'Week2', 'week3', 'week4'];
        } else if (report == 'yearly' || report == "early") {
            chartRef.series[0].update({"data":[72.9, 14, 74, 43, 87, 35, 99.5, 112, 76.4, 21, 67, 88]},false);
            chartRef.setTitle({text: "Yearly Report"});
            isChange = true;
            xAxis = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'oct', 'Nov', 'Dec'];
        }

        if(isChange) {
            $("#chart1").highcharts().xAxis[0].setCategories(xAxis);
        } else {
            $rootScope.speeckToUser({
                    "text": "please check your report type"
                });
        }
    }
    $scope.chartReports = function(type) {
        if (!$rootScope.chartStatus) {
            type = type;
        } else {
            type = $rootScope.chartStatus;
        }
        if ($rootScope.chartType) {
            $scope.charttype = $rootScope.chartType;
        }
        $scope.dchartConfig = {
            chart: {
                type: $scope.charttype
            },
             credits: {
                enabled: false
            },
            legend: {
                enabled: false
            },
            title: {
                text: 'Daily Reports'
            },
            xAxis: {
                categories: ['Morning', 'Afternoon', 'Evening']
            },
            "yAxis":{
                "title":{
                    "text":""
                }
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
    };
})