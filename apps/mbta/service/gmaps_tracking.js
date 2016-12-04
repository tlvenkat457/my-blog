mbta_module.service('gmaps_worker',['$http','$q',function($http,$q) {
    var mbta_gmaps_worker = this;
    
    function geo_success(position) {
        $q.resolve(position);
    }

    function geo_error() {
      $q.reject(false);
    }

    var geo_options = {
      enableHighAccuracy: true, 
      maximumAge        : 30000, 
      timeout           : 27000
    };

    mbta_gmaps_worker.getUserLocation = function() {
        if ("geolocation" in navigator) {
            var wpid = navigator.geolocation.watchPosition(geo_success, geo_error, geo_options);
        } else {
            $q.reject(false);
        }
    };
    
    return mbta_gmaps_worker;
}]);