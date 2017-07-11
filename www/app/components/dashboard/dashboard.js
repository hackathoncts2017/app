hackathon.controller("DashboardController", function(shared, $state, $scope, $mdDialog, $mdSidenav, $mdComponentRegistry, $rootScope, $timeout, $compile, DashboardService, $http) {
    $rootScope.$on("DashboardSpeech", function(controller, data) {
        console.log(data);
        $scope.dashboardAudio(data.text);
    });
    //$rootScope.$emit("headedText", {"header":"Dashboard"});
    var h = window.innerHeight;
    $scope.chartHeight = h - 310;
    $scope.Weatherdata = null;
    $scope.isLoading = true;
    $scope.pendingjobs =[];
     $scope.completedjobs =[];
    $scope.WeatherIcon = 'http://openweathermap.org/img/w/10d.png';
    $scope.dashboardAudio = function(audiotext) {
        var keyWords = ["show", "change", "weather"];
        if (audiotext.indexOf(keyWords[0]) > -1) {
            audiotext = audiotext.split(keyWords[0]);
            if (audiotext.length > 1 && audiotext[1] != "") {
                audiotext = audiotext[0];
                if(audiotext == 'bar'){
                  audiotext = 'column'
                }
                $rootScope.chartStatus = audiotext;
                $scope.chartReports(audiotext);
            } else {
                $rootScope.speeckToUser({
                    "text": "Invalid chart type"
                })
            }
        } else if (audiotext.indexOf(keyWords[1]) > -1) {
            audiotext = audiotext.split(keyWords[1]);
            if (audiotext.length > 1 && audiotext[1] != "") {
                audiotext = audiotext[0];
                $rootScope.chartType = audiotext;
                var chartStatus;
                if (!$rootScope.chartStatus) {
                    chartStatus = 'daily';
                } else {
                    chartStatus = $rootScope.chartStatus
                }
                $scope.chartReports(chartStatus);
            } else {
                $rootScope.speeckToUser({
                    "text": "Invalid Status"
                });
            }
        }
        if (audiotext.indexOf(keyWords[2]) > -1) {
            audiotext = audiotext.split(keyWords[2]);
            if (audiotext.length > 1 && audiotext[1] != "") {
                $rootScope.speeckToUser({
                    "text": "Description" + $scope.Weatherdata.weather.weather[0].description + "and" + "Humidity" + $scope.Weatherdata.weather.main.humidity + "and" + "Temperature" + $scope.Weatherdata.weather.main.temp
                });
                $scope.chartReports(audiotext);
            } else {
                $rootScope.speeckToUser({
                    "text": "Invalid Command"
                })
            }
        }
    };
    $scope.getDetails = function() {
        $scope.userdetails = null;
        DashboardService.getDetails().then(function(res) {
            console.log(res);
            $scope.isLoading = false;
            if (!res.error && res.data.data.length > 0) {
                $scope.userdetails = res.data.data[0];
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
            }
        });
    };
   
     $scope.getjob = function() {
     

      DashboardService.getJob().then(function(res){
                   
                    for(var i = 0; i<res.data.length;i++) {
                       console.log(res.data[i]);
                        if(res.data[i].status == "I") {
                            $scope.pendingjobs.push(res.data[i]);
                            
                        }
                        else if(res.data[i].status == "C"){
                         $scope.completedjobs.push(res.data[i]);

                        }
                    }
                    console.log(" $scope.pendingjobs", $scope.pendingjobs);
                    console.log(" $scope.completedjobs", $scope.completedjobs);
                   
                });
    }

    $scope.weatherReports = function() {
        DashboardService.getWeather({
            "lon": "13",
            "lat": "80"
        }).then(function(res) {
            console.log("weather", res);
            if (!res.error) {
                $scope.Weatherdata = res.data.data;
                $scope.WeatherIcon = "http://openweathermap.org/img/w/" + $scope.Weatherdata.weather.weather[0].icon + ".png";
                console.log("$scope.WeatherIcon", $scope.WeatherIcon);
            }
        });
    };
    $scope.showAlert = function(ev) {
        // Appending dialog to document.body to cover sidenav in docs app
        // Modal dialogs should fully cover application
        // to prevent interaction outside of dialog
        $mdDialog.show($mdDialog.alert().parent(angular.element(document.querySelector('#popupContainer'))).clickOutsideToClose(true).title('Weather Report').textContent("Description: " + $scope.Weatherdata.weather.weather[0].description + ", " + "Humidity: " + $scope.Weatherdata.weather.main.humidity + ", " + "Temperature: " + $scope.Weatherdata.weather.main.temp).ariaLabel('Alert Dialog Demo').ok('Close').targetEvent(ev));
    };
    $scope.chartConfig = '';
    $scope.charttype = 'column';
    $scope.chartsection = true;
    $scope.chartReports = function(type) {
        if (!$rootScope.chartStatus) {
            type = type;
        } else {
            type = $rootScope.chartStatus;
        }
        if ($rootScope.chartType) {
            $scope.charttype = $rootScope.chartType;
        }
        if (type == 'daily') {
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
            $scope.dailychart = true;
            $scope.weeklychart = false;
            $scope.monthlychart = false;
            $scope.yearlychart = false;
        } else if (type == 'weekly') {
            $scope.wchartConfig = {
                chart: {
                    type: $scope.charttype,
                },
                title: {
                    text: 'Weekly Reports'
                },
                xAxis: {
                    categories: ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
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
                    data: [72.9, 9.5, 76.4, 33.5, 12, 85]
                }]
            };
            $scope.dailychart = false;
            $scope.weeklychart = true;
            $scope.monthlychart = false;
            $scope.yearlychart = false;
        } else if (type == 'monthly') {
            $scope.mchartConfig = {
                chart: {
                    type: $scope.charttype,
                },
                title: {
                    text: 'Montly Reports'
                },
                xAxis: {
                    categories: ['Week1', 'Week2', 'week3', 'week4']
                },
                series: [{
                    data: [72.9, 99.5, 6.4, 64.3]
                }]
            };
            $scope.dailyclass = '';
            $scope.dailychart = false;
            $scope.weeklychart = false;
            $scope.monthlychart = true;
            $scope.yearlychart = false;
        } else if (type == 'yearly') {
            $scope.ychartConfig = {
                chart: {
                    type: $scope.charttype,
                },
                credits: {
                    enabled: false
                },
                title: {
                    text: 'Yearly Reports'
                },
                legend: {
                    enabled: false
                },
                xAxis: {
                    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'oct', 'Nov', 'Dec']
                },
                yAxis: {
                    title: {
                        text: ''
                    },
                },
                series: [{
                    data: [72.9, 14, 74, 43, 87, 35, 99.5, 112, 76.4, 21, 67, 88]
                }]
            };
            $scope.dailychart = false;
            $scope.weeklychart = false;
            $scope.monthlychart = false;
            $scope.yearlychart = true;
        }
    };
})