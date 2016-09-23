/**
 * Created by venkat on 9/22/16.
 */


angular.module('app',[]);

angular.module('app').controller('mainCtrl',function($scope){
    $scope.user1 = {name:"Krishna Chandra", address : {
        street : "15 salem place",
        city : "Malden",
        state : "MA",
        country: "USA"
    },
        friends: [
            'Balaram',
            'Gopal',
            'Sudhama'
        ]
    };

    $scope.user2 = {name:"Radha Rani", address : {
        street : "1092 Riviera Dr",
        city : "Virginia Brach",
        state : "VA",
        country: "USA"
    },
        friends: [
            'Gaura',
            'Vishaka',
            'Nithai'
        ]
    }
});

angular.module('app').directive('userInfoCard',function(){

    return {
        templateUrl: "userInfoCard.prtl.html",
        restrict : "E",
        scope: {
            user : "="
        },
        controller : function($scope){

            $scope.collapsed = false;
            $scope.knightMe = function(user){
                user.rank = "knight";
            };
            $scope.collapse = function(){
                $scope.collapsed = !$scope.collapsed;
            }
        }
    }

});

angular.module('app').directive('address', function(){
    
    return {
        templateUrl: "address.prtl.html",
        restrict : "E",
        controller: function($scope){
            $scope.addressCollapsed = false;
            $scope.collapseAddress = function () {
                $scope.addressCollapsed = !$scope.addressCollapsed;
            }
            $scope.expandAddress = function () {
                $scope.addressCollapsed = !$scope.addressCollapsed;
            }
        }
    }
})