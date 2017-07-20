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
    $scope.showBubble = true;
    $scope.completedjobs =[];
	$scope.defaultLocation = 'current-location'; 
    $scope.WeatherIcon = 'http://openweathermap.org/img/w/10d.png';
    $scope.dashboardAudio = function(audiotext) {
        var keyWords = ["show", "change to", "weather","change 2","so","change two",];
        if(!$scope.isCustomer) {
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
                        "text": "Today Weather Report" + $scope.dashboardData.weather.weather[0].description + "and" + "Humidity is " + $scope.dashboardData.weather.main.humidity + "and" + "Temperature is" + $scope.dashboardData.weather.main.temp
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
        } else {
            if($scope.getName) {
                $scope.customerName = audiotext;
                $scope.registerUser(true,"name", audiotext)
            } else if($scope.getNumber) {
                $scope.customerNumber = audiotext;
                $scope.registerUser(true,"number", audiotext)
            } else if ($scope.newIssue) {
                $scope.issueDetails = audiotext;
                $rootScope.speeckToUser({
                    "text": "When do you want our service personal to visit your location"
                });
                $scope.newIssue = false;
                $scope.getTime = true;
            } else if($scope.getTime) {
                $scope.getTime = false;
                var date = new Date();
                if(audiotext == "today") {
                    date.setHours(date.getHours() + 1);
                } else {
                    date.setDate(date.getDate() + 1); 
                }
                $scope.issueDate = date;
                $rootScope.speeckToUser({
                    "text": "Please confirm you location."
                });
                
                $scope.getLoc = true;
                setTimeout(function() {
                    $("#fff").trigger("click");
                },2500);
                $("#fff").trigger("click");
            } else if ($scope.getLoc && !$scope.confirmLocation) {
                if(audiotext.indexOf('current') > -1) {
                    $scope.defaultLocation = 'current-location';
                } else {
                    $scope.defaultLocation = audiotext;
                }
                $scope.confirmLocation = true;
                setTimeout(function() {
                    $("#fff").trigger("click");
                },2000);
                $("#fff").trigger("click");
                setTimeout(function() {
                    $rootScope.speeckToUser({
                        "text": "Is the location marked in the map correct?"
                    });
                    $scope.locationMap();
                },3500);
            } else if($scope.confirmLocation) {
                $scope.confirmLocation = false;
                if(audiotext.indexOf('yes') > -1 || audiotext.indexOf('correct') > -1) {
                    var mapDet = $scope.mapDetailsInfo;
                    $scope.getLoc = false;
                    if($scope.defaultLocation !== 'current-location') {
                        var geocoder = new google.maps.Geocoder();
                        geocoder.geocode( { 'address': $scope.defaultLocation}, function(results, status) {
                            $scope.myLocation = results[0].geometry.location.lat() + ',' + results[0].geometry.location.lng();
                            $("#fff").trigger("click");
                            setTimeout(function() {
                                $("#fff").trigger("click");
                                $scope.registerNewComplaint();
                            },2500);    
                        });
                    } else {
                        $scope.myLocation =  mapDet.center.lat() + ',' + mapDet.center.lng();
                         $("#fff").trigger("click");
                        setTimeout(function() {
                            $("#fff").trigger("click");
                            $scope.registerNewComplaint();
                        },2500);
                    }

                    
                } else {
                    $scope.getLoc = true;
                    $rootScope.speeckToUser({
                        "text": "Please confirm you location."
                    });
                }
            } else if(audiotext.indexOf('register') > -1) {
                $scope.newIssue = true;
                $rootScope.speeckToUser({
                    "text": "Please tell us the issue you are facing"
                });
            } else if (audiotext.indexOf('track') > -1) {
                if($rootScope.assignedEngId != -1) {
                    $rootScope.tabChange(1);
                } else {
                    $rootScope.speeckToUser({
                        "text": "You dont have any jobs to be tracked"
                    });
                }
            }
        }
    };
    $scope.registerNewComplaint = function() {
        var request = {
          "userId": "",
          "postedBy": "" + JSON.parse(localStorage.userDetails).id,
          "Location": $scope.myLocation,
          "Address": $scope.defaultLocation,
          "customerName": JSON.parse(localStorage.userDetails).engineerName,
          "customerContactNo": JSON.parse(localStorage.userDetails).mobileNo.replace(/\s/g,''),
          "jobOn": $scope.issueDate.toDateString(),
          "reason": $scope.issueDetails
        };
        console.log(request);
        DashboardService.registerComplaint(request, function(data){
            $rootScope.speeckToUser({
                "text": "Thank you for providing your details. We will be sending you the details of the appointment shortly"
            });
        });
        
    }

     

    $scope.getNumber = function(num) {
    return new Array(num);   
    }

    $scope.getDetails = function() {
        $scope.userdetails = null;
        DashboardService.getDetails().then(function(res) {
            $scope.isLoading = false;
            if (!res.error && res.data.data.length > 0) {
                localStorage.userDetails = JSON.stringify(res.data.data[0]);
                if(!res.data.data[0].isNewUser && res.data.data[0].isCustomer == 0) {
                    $scope.userdetails = res.data.data[0];
                    $rootScope.isAdmin = res.data.data[0].isAdmin;
                    $scope.userdetails.designation = "Senior Executive";
                    $scope.registerNewUser = false;
                    $scope.userRegistered = true;
                    $scope.isCustomer = false;
                    $rootScope.isCustomer = 0;
                } else if(res.data.data[0].isNewUser) {
                    $scope.registerNewUser = true; 
                    $scope.isCustomer = true;
                    $scope.userRegistered = false;
                    $rootScope.isCustomer = 1;
                } else if (res.data.data[0].isCustomer == 1){
                    $scope.registerNewUser = false;
                    $scope.isCustomer = true;
                    $scope.userRegistered = true;
                    $scope.customerName = res.data.data[0].engineerName;
                    $scope.customerNumber = res.data.data[0].mobileNo;
                    $rootScope.isCustomer = 1;
                }
                
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
    $scope.customerName = "";
    $scope.customerNumber = "";
    //$scope.customer ={name:"",mobile:""}
    $scope.registerUser = function(context, action, detail) {
       
        if(!context) {
            $rootScope.speeckToUser({
                "text": "Welcome to Digital service existance. We need few information before we get started. PLease provide us your name."
            });
            $scope.getName = true;
        } else if (action == "name") {
            $rootScope.speeckToUser({
                "text": "Thank you " + detail + " . Please provide your mobile number"
            });
            $scope.getName = false;
            $scope.getNumber = true;
        } else if (action == "number") {
            $rootScope.speeckToUser({
                "text": "Thank you for providing your details. Enjoy our service"
            });
            $scope.userRegistered = true;
            $scope.getNumber = false;
            $("#fff").trigger("click");
            var requestData = {
                "userName" : $scope.customerName,
                "mobileNo" : $scope.customerNumber.replace(/\s/g,'')
            }
            DashboardService.registerUser(requestData,function(data) {
                $scope.getDetails();
            });
        }
        
    }
     $scope.getjob = function() { 
        if($scope.userdetails.isAdmin == "0") {
            DashboardService.getJob().then(function(res){
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
            $scope.mapDetailsInfo = map;
            $scope.myLocation = map.center.lat() + ',' + map.center.lng();
            $("#fff").trigger("click");
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
    window.drawChart = $scope.drawChart = function(type) {
        var chartType = ['line','spline','area','areaspline','column'];
        if(chartType.indexOf(type) > -1){
            $scope.showBubble = false;            
            $("#chart1").highcharts().update({"chart":{"type":type,height:$scope.chartHeight,width:$(window).width() - 20}})
			$("#fff")[0].click()
        } else if(type == "bubble") {
            $scope.showBubble = true;
            $("#fff")[0].click()
        } else {
            $rootScope.speeckToUser({
                    "text": "Chart type not allowed"
                });
        }
        
    }
    window.chartReportChange = $scope.chartReportChange = function(report) {
        if($scope.showBubble){
                 $rootScope.speeckToUser({
                        "text": "Report type not allowed"
                    });
        } else {
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
        //$scope.charttype = 'bubble';

        //if($scope.charttype == 'bubble'){
                //alert($scope.charttype);
                var marker = {
                        lineColor:"#7cb5ec",
                        fillColor: {
                            radialGradient: { cx: 0.4, cy: 0.3, r: 0.7 },
                            stops: [
                                [0, 'rgba(255,255,255,0.5)'],
                                [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0.5).get('rgba')]
                            ]
                        }
                    };
                $scope.dchartConfigBubble = {

                    chart: {
                    type: 'bubble',
                    plotBorderWidth: 1,
                    zoomType: 'xy',
                    plotBorderColor: 'transparent',
                },

                title: {
                    text: 'Yearly Report'
                },
                  credits: {
                            enabled: false
                        },
                        legend: {
                            enabled: false
                        },

                xAxis: {
                    gridLineWidth: 0,
                    lineWidth: 0,    
                    tickLength: 0, 
                       labels: {
                           enabled: false
                       },
                    min:0,
                    max:200
                },
                yAxis: {
                    min:0,
                    max:200,
                    gridLineWidth: 0,
                     labels: {
                           enabled: false
                       },
                    title:{
                                "text":""
                            }
                },
                plotOptions: {
                    series: {
                        dataLabels: {
                            enabled: true,
                            format: '{point.name}',
                            color: 'black'
                        }
                    },
                    bubble: {
                        minSize: 10,
                        maxSize: 150
                    }

                },

                series: [{
                    data: [{ x: 150, y: 135, z:150, name: 'Q1',}],marker: marker
                },{
                    data: [{ x: 80, y: 70, z:90, name: 'Q2',}],marker: marker
                },{
                    data: [{ x: 40, y: 150, z:70, name: 'Q3',}],marker: marker
                },{
                    data: [{ x: 25, y: 40, z:40, name: 'Q4',}],marker: marker
                },{
                    data: [{ x: 90, y: 68, z:25, name: ''}],marker: {fillColor:'transparent',lineColor: 'transparent'},visible:true
                }]

            }; 

        //}
        //else{
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
            //}
    };
})