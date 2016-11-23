mbta_module.service('mbta_worker',['$http', '$q', function($http, $q) {
    var mbta_worker = this,
        mbta_token = 'wbvXYgd5fkOaVqoHnyz8tg';
    
    var fakeLocation = {userLat:'42.426845',
                        userLon:'-71.0742895'}
    
    
    mbta_worker.getStationInfo = function(userLocationObj) {
        var userLocationObj = userLocationObj || fakeLocation ;
        return $http.get('https://realtime.mbta.com/developer/api/v2/stopsbylocation?api_key='
        +mbta_token+'&lat='
        +userLocationObj.userLat
        +'&lon='+userLocationObj.userLon
        +'&format=json').then( function(responseData) {
            console.log(responseData);
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
            console.log(responseData);
            return responseData.data;
        }, function(responseErr) {
            console.log(responseErr);
        })
    }
    
    return mbta_worker;
}])