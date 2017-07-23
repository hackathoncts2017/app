
(function(){
  'use strict';

  	angular.module('hackathonApp').controller('dashboardController',['$scope','homeModel','appService','$window','appconfig','$interval','$timeout',function($scope,homeModel,appService,$window,appconfig,$interval,$timeout){
  		  
        $scope.$parent.displayHeaderFooter(false,true);

        
        $scope.todayDate = new Date();
        $scope.todayCalls = 20;
        $scope.todayAttempted = 10;
        $scope.todayPending = 5;
        $scope.weatherIcon = "assets/icons/rainy_small.png";
        $scope.minWeather = "19";
        $scope.maxWeather = "32";
        $scope.userName = "Granottier";
        $scope.designation = "Senior Manager";

        $scope.currentAddress = {city:'Chennai',weather:'partly Cloudy'};


        $scope.userImage = "assets/userIcon.png";

        $scope.callCounter = '22:60';
        $scope.minCounter = 22;
        $scope.secCount = 60;
        $scope.selectedIndex = 0;

        

        $scope.cardslist =['<div class="card_"><div class="banner"><div class="userTile"><div class="menuBtn"><img src="assets/icon.png"></img></div><div layout="row" class="userInfo"><div class="imgWrapper"><img ng-src="{{userImage}}"/></div><div layout="column"><div class="username"><b>{{userName}}</b></div><div>{{designation}}</div></div></div></div><div class="infoTile" layout="column"><div class="tile" flex><div>{{todayDate | date : "dd"}}</div><div>{{todayDate | date : "EEEE"}}</div></div><div class="tile" flex><div style="padding-top:3px; padding-bottom:0px;"><img ng-src="{{weatherIcon}}"/></div><div>{{minWeather}}<sup>o</sup> - {{maxWeather}}<sup>o</sup></div></div><div class="tile" flex><div>Count</div><div>{{callCounter}}</div></div></div></div><div class="statusStrip" layout="row"><div flex class="textWrapper dateTile"><div flex>Calls</div><div flex>{{todayCalls}}</div></div><div flex class="textWrapper weatherTile"><div flex>Attempt</div><div flex>{{todayAttempted}}</div></div><div flex class="textWrapper counterTile"  layout="column"><div flex>Pending</div><div flex>{{todayPending}}</div></div><div flex class="dynamicTile callTile"><div>Next Call</div><div>15 KM</div><div>03:20 PM</div></div></div><div class="selectionBar" layout="row"><div class="btnwrapper" ><div class="dashboardBtn" ng-class="{\'selectedBtn\':selectedIndex == 0}">Weekly</div></div><div class="btnwrapper"><div class="dashboardBtn" ng-class="{\'selectedBtn\':selectedIndex == 1}">Monthly</div></div><div class="btnwrapper"><div class="dashboardBtn" ng-class="{\'selectedBtn\':selectedIndex == 2}">Yearly</div></div></div></div>',
                          '<p class="triangle-isosceles">Where I am now?</p>',
                          '<div class="card_ card section"><md-card><img src="assets/cityView1.jpg" class="md-card-image"/><md-card-content><h2>Chennai, Thoraipakkam</h2><p>Shall I search service agents near Thoraipakkam? Sir</p></md-card-content><md-card-actions layout="row"layout-align="end center"><md-button>Yes</md-button><md-button>No</md-button></md-card-actions></md-card></div>',
                          '<p class="triangle-isosceles">Send application request to Joseph employee id 23456 as Service Agent</p>',
                          '<div class="card_ card  adduser"><md-card><md-card-title><md-card-title-text><span class="md-headline">Joseph</span><span class="md-subhead">Do I want to send the request?</span></md-card-title-text><md-card-title-media><div class="md-media-sm card-media"><img src="assets/cityView1.jpg" class="md-card-image"/></div></md-card-title-media></md-card-title><md-card-actions layout="row" layout-align="end center"><md-button>Yes</md-button><md-button>No</md-button></md-card-actions></md-card></div>',
                         '<p class="triangle-isosceles">update weather status</p>',
                          '<div  class="card_ card weatherCard"><table><tr><td><div>Sun</div><div><img src="assets/icons/sunny_small.png"/></div><div>29<sup>o</sup> 36<sup>o</sup></div></td><td><div>Mon</div><div><img src="assets/icons/rainy_small.png"/></div><div>28<sup>o</sup> 36<sup>o</sup></div></td><td><div>Tue</div><div><img src="assets/icons/rainy_small.png"/></div><div>28<sup>o</sup> 35<sup>o</sup></div></td><td><div>Wed</div><div><img src="assets/icons/rainy_small.png"/></div><div>29<sup>o</sup> 35<sup>o</sup></div></td><td><div>Thu</div><div><img src="assets/icons/rainy_small.png"/></div><div>28<sup>o</sup> 34<sup>o</sup></div></td><td><div>Fri</div><div><img src="assets/icons/rainy_small.png"/></div><div>29<sup>o</sup> 35<sup>o</sup></div></td><td><div>Sat</div><div><img src="assets/icons/rainy_small.png"/></div><div>28<sup>o</sup> 35<sup>o</sup></div></td></tr></table></div>',
                          '<p class="triangle-isosceles">What is todays weather status?</p>',
                          '<div class="card_ card  todayWeatherCard"><md-card><md-card-content><h2>Thunderstorm</h2><div class="weatherRow"><div class="weatherCol1"><div><img src="assets/icons/sunny_large.png"/></div><div>29<sup>o</sup> 36<sup>o</sup></div></div><div class="weatherCol2"><table><tr><td>Percipitation</td><td>40</td></tr><tr><td>Humidity</td><td>71</td></tr><tr><td>Wind</td><td>23</td></tr></table></div></div></div></div></md-card-content></md-card</div>',
                          '<p class="triangle-isosceles">List purchase order</p>',
                          '<div class="card_ card productList"><md-card><md-card-content><h2>Purchased Item</h2><div class="items"><div class="leftArrow">&lt;</div><img src="assets/cityView1.jpg" class="md-card-image"/><div class="rightArrow">&gt;</div></div></md-card-content></md-card></div>'
                        ];

        $scope.weatherData = [{day:'Sun',weather:'Thunderstorm',icon:'sunny',min:29,max:36,data:{percipitation:40,humidity:71,wind:23}},
                              {day:'Mon',weather:'partly Cloudy',icon:'rainy',min:28,max:36,data:{percipitation:10,humidity:59,wind:16}},
                              {day:'Tue',weather:'partly Cloudy',icon:'rainy',min:28,max:35,data:{percipitation:0,humidity:60,wind:16}},
                              {day:'Wed',weather:'partly Cloudy',icon:'rainy',min:29,max:35,data:{percipitation:0,humidity:60,wind:18}},
                              {day:'Thu',weather:'Thunderstorm',icon:'rainy',min:28,max:34,data:{percipitation:10,humidity:60,wind:16}},
                              {day:'Fri',weather:'partly Cloudy',icon:'rainy',min:29,max:35,data:{percipitation:20,humidity:60,wind:18}},
                              {day:'Sat',weather:'partly Cloudy',icon:'rainy',min:28,max:35,data:{percipitation:10,humidity:60,wind:14}}];

        $scope.todayWeather = $scope.weatherData[$scope.todayDate.getDay()];

        $interval(function () {
          if($scope.secCount <= 0){
            $scope.secCount = 60;
            $scope.minCounter--;
          }
          $scope.callCounter = $scope.minCounter+':'+$scope.secCount;
          $scope.secCount--;
        }, 1000);
        
        $scope.$on('onNewCard', function(event, obj) {
          
          $scope.cardslist.push("<p  class='triangle-isosceles'>"+obj.speechInput+"</p>");

          if(obj.speechInput.indexOf('weather') != -1){
            insertCard('weather',obj.speechInput);
          }else if(obj.speechInput.indexOf('product') != -1){
            insertCard('product',obj.speechInput);
          }
          /*$(".card_").addClass("removeCard");
          $timeout(function(){
            $(".card_.removeCard").addClass("removedCard").remove();
            debugger;
          }, 1000)*/
        });
        

        function insertCard(_type,_data){
          var tableR1 = "";
          switch(_type){
            case 'map':
              _data = "";
            break;
            case 'speech':
            break;
            case 'weather':
              var isToday = _data.indexOf('today')||_data.indexOf('tomorrow') || _data.indexOf('yesterday');
              if(isToday){
                tableR1 = "<div class='card_ card  weatherCard'>";
                tableR1 += "<md-card><md-card-content><h2>"+$scope.todayWeather.weather+"</h2><div class='weatherRow'><div class='weatherCol1'><div><img src='assets/icons/"+$scope.todayWeather.icon+"_large.png'/></div><div>"+$scope.todayWeather.min+"<sup>o</sup> "+$scope.todayWeather.max+"<sup>o</sup></div></div><div class='weatherCol2'><table><tr><td>Percipitation</td><td>"+$scope.todayWeather.data.percipitation+"</td></tr><tr><td>Humidity</td><td>"+$scope.todayWeather.data.humidity+"</td></tr><tr><td>Wind</td><td>"+$scope.todayWeather.data.wind+"</td></tr></table></div></div></md-card-content></md-card";
                tableR1 += "</div>";
              }else{
                tableR1 = "<div class='card_ card  weatherCard'><table><tr>";
                for(var i=0;i<7;i++){
                  tableR1 += "<td><div>"+$scope.weatherData[i].day+"</div><div><img src='assets/icons/"+$scope.weatherData[i].icon+"_small.png'/></div><div>"+$scope.weatherData[i].min+"<sup>o</sup> "+$scope.weatherData[i].max+"<sup>o</sup></div></td>";
                }
                tableR1+="</tr></table></div>"
              }
              $scope.cardslist.push(tableR1);
            break;
            case 'product':
              debugger;
              tableR1 = "<div class='card_ card'>";
              tableR1 += "<md-card><md-card-content><h2>"+$scope.todayWeather.weather+"</h2><div><img src='assets/cityView1.jpg' class='md-card-image'/></div></md-card-content></md-card>";
              tableR1 += "</div>";
              console.log(tableR1);
              $scope.cardslist.push(tableR1);
            break;
          }
          return _data;
        }
  	}]);
  })();