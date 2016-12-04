mbta_module.service('mbta_worker',['$http', '$q', function($http, $q) {
    var mbta_worker = this,
        mbta_token = 'wbvXYgd5fkOaVqoHnyz8tg',
        subwayInfo = [];
    
        var fakeLocation = {userLat:'42.4269242',
                        userLon:'-71.0748367'};
                        
/*      var fakeLocation = {userLat:'42.355518',
                        userLon:'-71.0624137'};*/
    
    var epochTimeConverter = function(mbtaEpochTime) {
        var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
        d.setUTCSeconds(mbtaEpochTime);
        return d;
    };
    
    var convertSecToMin = function(timeToArriveSec) {
        var arrivalTimeMin = Math.ceil((timeToArriveSec/60)-1);
        return arrivalTimeMin;
    }
    
    mbta_worker.getStationInfo = function(userLocationObj) {
        var userLocationObj = userLocationObj || fakeLocation ;
        return $http.get('https://realtime.mbta.com/developer/api/v2/stopsbylocation?api_key='
        +mbta_token+'&lat='
        +userLocationObj.userLat
        +'&lon='+userLocationObj.userLon
        +'&format=json').then( function(responseData) {
            return responseData.data;
        }, function(responseErr) {
            console.log(responseErr);
        })
    }
    
    mbta_worker.getRoutesByStop = function(stop_id) {
        var stop_id = stop_id || 'place-mlmnl' ;
        return $http.get('https://realtime.mbta.com/developer/api/v2/routesbystop?api_key=wbvXYgd5fkOaVqoHnyz8tg&stop='+stop_id+'&format=json').then( function(responseData) {
            console.log(responseData);
        }, function(responseErr) {
            console.log(responseErr);
        })
    }
    
    mbta_worker.getpredictionsbystop = function(stop_id) {
        var stop_id = stop_id || 'place-mlmnl' ;
        return $http.get('https://realtime.mbta.com/developer/api/v2/predictionsbystop?api_key=wbvXYgd5fkOaVqoHnyz8tg&stop='+stop_id+'&format=json').then( function(responseData) {
            return responseData.data;
        }, function(responseErr) {
            console.log(responseErr);
        })
    }
    
    mbta_worker.getFormattedSubwayInfo = function(subwayInfoArray) {
        angular.forEach(subwayInfoArray, function(subwayLines, key) {
            angular.forEach(subwayLines.direction, function(subwayTrainDirection, key) {
                var subwayLineInfoObj = {},
                    tripTimesArray = [];
                subwayLineInfoObj.subwayLineColor = subwayLines.route_name;
                subwayLineInfoObj.subwayLineBound = subwayTrainDirection.direction_name;
                subwayLineInfoObj.trainTo = subwayTrainDirection.trip[key].trip_headsign;
                for(var i = 0; i <subwayTrainDirection.trip.length; i++) {
                        tripTimesArray.push(convertSecToMin(subwayTrainDirection.trip[i].pre_away));
                }
                subwayLineInfoObj.arrivalTimes = tripTimesArray.join(', ');
                subwayInfo.push(subwayLineInfoObj);
            })
        })
        console.log(subwayInfo);
        return subwayInfo;
    }
    
    return mbta_worker;
}]);