(function(){
  'use strict';
  console.log("templateCache");
  	angular.module('hackathonApp').run(function($rootScope, $location, $templateCache) {

  			$templateCache.put('modules/home/homeScreen.html','\
  			<div splitheight="100" headerHei="70" footerHei="70">\
  				<div class="box prodPanel">\
  					<div class="prodListItem" ng-repeat="product in productDetail | orderBy:\'type\'" ><div class="iconHolder"><img ng-src="product.icon" on-error="assets/broken-img.png" /></div><div class="detailGrp"><h3 class="prodTyp">{{product.type}}</h3><div class="moreDetail" ng-click="moreDetails(product.details)" ng-if="product.details">More details</div></div></div>\
  				</div>\
  				<div class="box cornerBox manufacturePanel" ng-if="manufacturer"> <select ng-model="selectedOption" class="sortBox" ng-options="x for x in sortOptions" ng-change="sortManufacturer()"></select>\
  				<div class="manufacturerList"><div ng-repeat="vehicle in manufacturer|orderBy:manufacturerSortBy" class="manufacturerListItem"><div class="iconHolder posRight"><img ng-src="vehicle.icon" on-error="assets/broken-img.png" /></div><h3>{{vehicle.manufacturer}}</h3><h3>Since : {{vehicle.founded | dateFormat:false}}</h3><div><div class="posRight"><h3 ng-click="handleVehicleDetail(vehicle.details)" class="pointer" ng-if="vehicle.details">More details</h3></div><div class="inline"><h3 class="pointer" ng-click="launchReview(vehicle.review)" ng-if="vehicle.review">Review</h3></div></div></div></div></div>\
  				<div class="box cornerBox detailPanel" ng-if="modelDetails"> <select ng-model="priceOption" class="sortBox" ng-options="x for x in priceSortOptions" ng-change="sortPrice()"></select>\
          <div class="modelList"><div class="modelItem" ng-repeat="model in modelDetails|orderBy:soryByPrice"><h3>{{model.name}}</h3><h3 ng-if="model.class">This is a {{model.class}} car.</h3><h3>{{model.price|INR}}</h3></div></div>\
          </div>\
  			</div>\
  			');
        $templateCache.put('modules/dash/dashBoard.html','\
            <div splitheight="100" headerHei="0" footerHei="0">\
              <div class="banner">\
                <div class="userTile">\
                  <div class="menuBtn">\
                      <img src="assets/icon.png"></img>\
                  </div>\
                  <div layout="row" class="userInfo"><div class="imgWrapper"><img ng-src="{{userImage}}"/></div><div layout="column"><div class="username"><b>{{userName}}</b></div><div>{{designation}}</div></div></div>\
                  </div>\
                <div class="infoTile" layout="column">\
                  <div class="tile" flex><div>{{todayDate | date : "dd"}}</div><div>{{todayDate | date : "EEEE"}}</div></div>\
                    <div class="tile" flex><div style="padding-top:3px; padding-bottom:0px;"><img ng-src="{{weatherIcon}}"/></div><div>{{minWeather}}<sup>o</sup> - {{maxWeather}}<sup>o</sup></div></div>\
                    <div class="tile" flex><div>Count</div><div>{{callCounter}}</div></div>\
                </div>\
              </div>\
              <div class="statusStrip" layout="row">\
                <div flex class="textWrapper dateTile"><div flex>Calls</div><div flex>{{todayCalls}}</div></div>\
                <div flex class="textWrapper weatherTile"><div flex>Attempt</div><div flex>{{todayAttempted}}</div></div>\
                <div flex class="textWrapper counterTile"  layout="column"><div flex>Pending</div><div flex>{{todayPending}}</div></div>\
                <div flex class="dynamicTile callTile"><div>Next Call</div><div>15 KM</div><div>03:20 PM</div></div>\
              </div>\
              <div class="selectionBar" layout="row">\
                <div class="btnwrapper" ><div class="dashboardBtn" ng-class="{\'selectedBtn\':selectedIndex == 0}">Weekly</div></div>\
                <div class="btnwrapper"><div class="dashboardBtn" ng-class="{\'selectedBtn\':selectedIndex == 1}">Monthly</div></div>\
                <div class="btnwrapper"><div class="dashboardBtn" ng-class="{\'selectedBtn\':selectedIndex == 2}">Yearly</div></div>\
                </div>\
            </div>\
          ');
          $templateCache.put('modules/narrative/login.html','\
            <div splitheight="100" headerHei="0" footerHei="0">\
              <div class="banner">\
                <div class="userTile"></div>\
                <div class="infoTile"></div>\
              </div>\
              <div class="statusStrip"></div>\
            </div>\
          ');
        $templateCache.put('modules/narrative/narrative.html','\
            <div splitheight="100" headerHei="0" footerHei="0">\
              <div class="banner">\
                <div class="userTile"></div>\
                <div class="infoTile"></div>\
              </div>\
              <div class="statusStrip"></div>\
            </div>\
          ');
  	});
  })();

