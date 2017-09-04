hackathon.controller("DashboardController", function(shared, $state, $scope, $mdDialog, $mdSidenav,NgMap, $mdToast,$mdComponentRegistry, $rootScope, $timeout, $compile, DashboardService, $http,NgMap) {
    $rootScope.$on("DashboardSpeech", function(controller, data) {
        /*if (data.text) {
                $mdToast.show(
                    $mdToast.simple()
                    .textContent(data.text)
                    .position('bottom right')
                    .hideDelay(5000)
                );
            } */        
        $scope.dashboardAudio(data.text);
    });
    //$rootScope.$emit("headedText", {"header":"Dashboard"});
    var h = window.innerHeight;
    $scope.chartHeight = h - 300;

    $scope.dashboardData = null;
    $scope.isLoading = true;
    $scope.pendingjobs =[];
    $scope.showBubble = false;
	$scope.whereAmI = false;
	$scope.userChat = false;
    $scope.chartDisplay = true;
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
                     $scope.chartDisplay = true;
                      
                      debugger;
                     if(audiotext == 'reports'){
                        audiotext = 'yearly';
                     }
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
                    audiotext = audiotext[0];
                    $scope.chartDisplay = true;
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
                        "text": "Today Weather is " + $scope.dashboardData.weather.weather[0].description + " and " + " Humidity is " + $scope.dashboardData.weather.main.humidity + " and " + " Temperature is " + $scope.dashboardData.weather.main.temp
                    });
                    //$scope.chartReports(audiotext);
                //} else {
                    //$rootScope.speeckToUser({
                     //   "text": "Invalid Command"
                    //})
                //}
            }  else if (audiotext.indexOf('where am i') > -1) {
                $scope.whereAmI = true;
				$scope.userChat = true;
            }  else if (audiotext.indexOf('reset') > -1) {
                $scope.whereAmI = false;
				$scope.userChat = false;
            }  else if (audiotext.indexOf('assign') > -1 || audiotext.indexOf('pending') > -1) {
                $rootScope.tabChange(1);
            } else {
                $rootScope.speeckToUser({
                    "text": "Please check your keyword"
                });
            }
        } else {
            if($scope.getName) {
                $scope.customerName = audiotext;
                $scope.registerUser(true,"name", audiotext)
            } else if($scope.getPhoneNumber) {
				var phoneno = /^\d{10}$/;  
				if(audiotext.match(phoneno)) {  
					$scope.customerNumber = audiotext;
					$scope.registerUser(true,"number", audiotext)
				}  
				else {  
					 $rootScope.speeckToUser({
						"text": "The number you have provided is invalid. Please provide a valid 10 digit number"
					},true);
				} 
                
            } else if ($scope.newIssue) {
                $scope.issueDetails = audiotext;
                $rootScope.speeckToUser({
                    "text": "When do you want our service personal to visit your location"
                },true);
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
                    },true);
                    $scope.locationMap();
                },3500);
            } else if($scope.confirmLocation) {
                $scope.confirmLocation = false;
                if(audiotext.indexOf('yes') > -1 || audiotext.indexOf('correct') > -1) {
                    var mapDet = $scope.mapDetailsInfo;
                    if($scope.defaultLocation !== 'current-location') {
                        var geocoder = new google.maps.Geocoder();
                        geocoder.geocode( { 'address': $scope.defaultLocation}, function(results, status) {
                            $scope.myLocation = results[0].geometry.location.lat() + ',' + results[0].geometry.location.lng();
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
                    }, true);
                }
            } else if(audiotext.indexOf('register') > -1) {
                $scope.newIssue = true;
                $rootScope.speeckToUser({
                    "text": "Please tell us the issue you are facing"
                }, true);
            } else if (audiotext.indexOf('track') > -1) {
                $rootScope.trackUser = true;
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
          "jobOn": $scope.issueDate.toISOString(),
          "reason": $scope.issueDetails
        };
        console.log(request);

        DashboardService.registerComplaint(request, function(data){
            $rootScope.speeckToUser({
                "text": "Thank you for providing your details. We will be sending you the details of the appointment shortly"
            });
            $rootScope.userJob();
            $scope.getLoc = false;
            $("#fff").trigger("click");
        }); 
    }

    $scope.getNumber = function(num) {
        var number = Number(num);
        return new Array(number);   
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
                    "designation": "Senior Executive1",
                    "deviceId": "c0e9928ff73b8fa1",
                    "image": "saravanan",
                    "isAdmin": "0",
                    "rating": "3"
                };
                $rootScope.isAdmin = "0";
            }
            $scope.weatherReports();
            $scope.getjob();
        });
    };
    $scope.customerName = "";
    $scope.customerNumber = "";
    //$scope.customer ={name:"",mobile:""}
    $scope.registerUser = function(context, action, detail) {
       
        if(!context) {
            $rootScope.speeckToUser({
                "text": "Welcome to Digital service assistance. We need few information before we get started. Please provide us your name."
            },true);
            $scope.getName = true;
        } else if (action == "name") {
			
            $rootScope.speeckToUser({
                "text": "Thank you " + detail + " . Please provide your mobile number"
            },true);
            $scope.getName = false;
            $scope.getPhoneNumber = true;
        } else if (action == "number") {
            $rootScope.speeckToUser({
                "text": "Thank you for providing your details. Enjoy our service"
            });
            $scope.userRegistered = true;
            $scope.getPhoneNumber = false;
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
                    if(res.data[i].status == "I" || res.data[i].status == "A" || res.data[i].status == "B") {
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
        var req = {
            "lon": "80",
            "lat": "13",
            "isAdmin": $scope.userdetails.isAdmin == "1" ? true : false
        };
        var options = {
                enableHighAccuracy: true
            };
        navigator.geolocation.getCurrentPosition(function(pos) {
            $scope.positionVal = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
            console.log(JSON.stringify($scope.positionVal));
            req.lat = "" + $scope.positionVal.lat();
            req.lon = "" + $scope.positionVal.lng();
            $scope.getWeather(req);
        }, 
        function(error) {    
            $scope.getWeather(req);                
            console.log('Unable to get location: ' + error.message);

        }, options);

        
    };
    $scope.getWeather = function(req) {
        DashboardService.getWeather(req).then(function(res) {
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
    }
    $scope.showAlert = function(ev) {
        // Appending dialog to document.body to cover sidenav in docs app
        // Modal dialogs should fully cover application
        // to prevent interaction outside of dialog
        $mdDialog.show($mdDialog.alert().parent(angular.element(document.querySelector('#popupContainer'))).clickOutsideToClose(true).title('Weather Report').textContent("Description: " + $scope.dashboardData.weather.weather[0].description + ", " + "Humidity: " + $scope.dashboardData.weather.main.humidity + ", " + "Temperature: " + $scope.dashboardData.weather.main.temp).ariaLabel('Alert Dialog Demo').ok('Close').targetEvent(ev));
    };
    $scope.chartConfig = '';
    $scope.charttype = 'areaspline';
    $scope.chartsection = true;
    window.drawChart = $scope.drawChart = function(type) {
        var chartType = ['line','spline','area','areaspline','column'];
        if(chartType.indexOf(type) > -1){
			if(type == "area"){
				type = "areaspline";
			} else if(type == "bar"){
				type = "column";
			}
            $scope.showBubble = false;                      
            $("#chart1").highcharts().update({"chart":{"type":type,height:$scope.chartHeight,width:$(window).width() - 10}})
			$("#fff")[0].click()
        } else if(type == "bubble") {
            $scope.showBubble = true;
            $("#chart2").highcharts().update({"chart":{"type":type,height:$scope.chartHeight,width:$(window).width() - 10}})
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
                chartRef.series[1].update({"data": [28, 9.5, 56.4]},false);
                 chartRef.series[2].update({"data": [48, 69.5, 76.4]},false);
                chartRef.setTitle({text: "Daily Report"});
                xAxis = ['Morning', 'Afternoon', 'Evening'];
                isChange = true;
            } else if (report == 'weekly')  {
                chartRef.series[0].update({"data": [72.9, 9.5, 76.4, 33.5, 12, 85]},false);
                chartRef.series[1].update({"data": [52.9, 59.5, 86.4, 53.5, 82, 95]},false);
                chartRef.series[2].update({"data": [32.9, 19.5, 16.4, 23.5, 52, 15]},false);
                chartRef.setTitle({text: "Weekly Report"});
                xAxis = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
                isChange = true;
            } else if (report == 'monthly') {
                chartRef.series[0].update({"data":[72.9, 99.5, 6.4, 64.3]},false);
                chartRef.series[1].update({"data":[22.9, 39.5, 4.4, 34.3]},false);
                chartRef.series[2].update({"data":[42.9, 59.5, 3.4, 24.3]},false);
                chartRef.setTitle({text: "Monthly Report"});
                isChange = true;
                xAxis = ['Week1', 'Week2', 'week3', 'week4'];
            } else if (report == 'yearly' || report == "early") {
                chartRef.series[0].update({"data":[72.9, 14, 74, 43, 87, 35, 99.5, 112, 76.4, 21, 67, 88]},false);
                chartRef.series[1].update({"data":[52.9, 94, 64, 38.3, 37, 5, 49.5, 192, 116.4, 101, 7, 128]},false);
                chartRef.series[2].update({"data":[32.9, 64, 84, 73, 17, 55, 19.5, 132, 126.4, 41, 27, 18]},false);
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
                     backgroundColor: 'transparent',
                    plotBorderWidth: 1,
                    height: $scope.chartHeight,
                    zoomType: 'xy',
                    plotBorderColor: 'transparent',
                },

                title: {
                    text: 'Yearly Report',
                     style: {
            color: '#fff',
            fontWeight: 'bold'
        }
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
                            color: '#fff'
                        }
                    },
                    bubble: {
                        minSize: 10,
                        maxSize: 150
                    }

                },

                series: [{
                    data: [{ x: 150, y: 135, z:150, name: 'Q1',}],marker: marker,
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
                type: $scope.charttype,
                height: $scope.chartHeight,
                backgroundColor: 'transparent',
            },
             credits: {
                enabled: false
            },
            legend: {
                enabled: false
            },
            title: {
                text: 'Yearly Reports',
                style: {
            color: '#fff',
            fontWeight: 'bold'
        }
            },
            labels: {
            style: {
                color: '#fff'
            }
        },
            xAxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'oct', 'Nov', 'Dec'],
                labels: {
            style: {
                color: '#fff'
            }
        }
            },
            "yAxis":{
                "title":{
                    "text":""
                },
                 labels: {
            style: {
                color: '#fff'
            }
        }
            },
            plotOptions: {
                series: {
                    marker: {
                enabled: false
            },
                    cursor: 'pointer',
                    events: {
                        click: function(event) {
                            $scope.$apply();
                        }
                    }
                }
            },
            series: [{
                data: [72.9, 14, 74, 43, 87, 35, 99.5, 112, 76.4, 21, 67, 88],color:'#f6a500'
            },{
                data: [52.9, 94, 64, 38.3, 37, 5, 49.5, 192, 116.4, 101, 7, 128],color:'#7cb5ec'
            },{
                data: [32.9, 64, 84, 73, 17, 55, 19.5, 132, 126.4, 41, 27, 18],color:'#00C876'
            }]
        };
            //}
    };
	var geocoder = new google.maps.Geocoder;
	$scope.getAddress =function() {
		NgMap.getMap().then(function(map) {
			var lat = map.center.lat(),
				lng = map.center.lng();
			geocoder.geocode({'location': {lat:lat,lng:lng}}, function(results, status) {
				if (status === 'OK') {
					$scope.userAdressForTile = results[0].formatted_address;
				} else {
					$scope.userAdressForTile = "";
				}
			});
		})
	}
})