var app = angular.module("gateWay", ['ui.router','ngMaterial']);

app.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('login');

    $stateProvider
        .state('login', {
            url: '/checkPoint',
            templateUrl: 'app/views/login.html',
            controller: function($scope, $http, $q, $log) {

               


                $scope.onAddChange = function() {

                    

                    var address = encodeURI($scope.address);

                    var emailPost = "https://autocomplete-api.smartystreets.com/suggest?auth-id=4430762390019225725&prefix="+address+"&suggestions=7"

                    $http.get(emailPost).then(function(response) {
                            
                            $scope.apiAddresses = response.data.suggestions;

                            if($scope.addressComplete) $scope.addressComplete= false;
                        },
                        function(error) {
                            console.log(error)
                        });

                }

                $scope.addSelected = function(selectedAddress){

                		console.log(selectedAddress);
                		$scope.address=selectedAddress.text;
                		$scope.addressComplete= true
                }

                $scope.onSubmit = function(){

                    $http({
                        method:'GET',
                        url:'http://52.73.184.219:7777/test'
                    }).then(function(response){

                        console.log(response)
                    },function(err){

                        console.log(err);
                    })
                
                }
            }
        })
        
}).run(['$state','$http', function($state,$http) {

    $state.go('login');
    $http.defaults.useXDomain = true;
    delete $http.defaults.headers.common['X-Requested-With'];

}]);