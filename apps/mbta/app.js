'use strict';
var mbta_module = angular.module('mbta_tracker',['ngMap']);
    
/*    mbta_module.config(function($rootScope) {
        
    });
    */
    mbta_module.run(function($rootScope,gmaps_worker) {
        gmaps_worker.getUserLocation(userCordinates)
            .then(function(){
                $rootScope.userCordinates = userCordinates;
            }, function(err) {
                console.log('failed to load user location'+err);
            });
    });
    
    mbta_module.controller('mbta_controller',['$scope', 'mbta_worker', function($scope, mbta_worker) {
        $scope.predictionsOff = true;
        $scope.init = function() {
         mbta_worker
            .getStationInfo()
            .then(function(nearByStation) {
                var nearestTstationId = 'place-mlmnl',
                    nearByStationFound = false;
                    
                for(var tStopsList = 0; tStopsList < nearByStation.stop.length; tStopsList++){
                    if((nearByStation.stop[tStopsList].parent_station != "") && !nearByStationFound){
                     nearestTstationId = nearByStation.stop[tStopsList].parent_station;
                     $scope.nearestTstation = nearByStation.stop[tStopsList].parent_station_name;
                     nearByStationFound = true;
                 }
                }    
                console.log(nearestTstationId);
                mbta_worker
                    .getpredictionsbystop(nearestTstationId)
                    .then(function(predictions) {
                        if(predictions.hasOwnProperty('mode')) {
                            angular.forEach(predictions.mode, function(value, key) {
                                if(value.mode_name === 'Subway') {
                                    $scope.subwayPredictions = mbta_worker.getFormattedSubwayInfo(value.route);
                                }
                            });
                            $scope.predictionsOff = true;
                            $scope.predictions = predictions;    
                        }
                    })
            })
         //mbta_worker.getRoutesByStop();
        }
    }]);