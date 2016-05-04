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

                	var transunion = $http({
                		url :'/api/transunion/',
                		method:'GET'
                	});

                	var equifax = $http({
                		url :'/api/equifax',
                		method:'GET'
                	});

                	 $scope.mull = 1;
                	 $scope.loadGif =true;
                	var apis = [transunion,equifax];

                	$q.all(apis).then(function(data){console.log(data)},function(err){console.log(err)})

                }
            }
        })
        
}).run(['$state', function($state) {

    $state.go('login');

}]);