var mbta_module = angular.module('mbta_tracker',[]);
    
    mbta_module.controller('mbta_controller',['$scope', 'mbta_worker', function($scope, mbta_worker) {
        $scope.predictionsOn = false;
        $scope.init = function() {
         mbta_worker
            .getStationInfo()
            .then(function(nearByStation) {
                mbta_worker
                    .getpredictionsbystop(nearByStation.stop[0].parent_station)
                    .then(function(predictions) {
                        if(predictions.hasOwnProperty('mode')) {
                            $scope.predictionsOn = true;
                            $scope.predictions = predictions;    
                        }
                    })
            })
         //mbta_worker.getRoutesByStop();
        }
    }]);