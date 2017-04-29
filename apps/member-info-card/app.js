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

    $scope.user3 = {name:"Nedd Stark", address : {
        street : "65 North point drive",
        city : "Boston",
        state : "MA",
        country: "USA"
    },
        friends: [
            'John Snow',
            'Angela',
            'Avon'
        ]
    }
});



angular.module('app').directive('userInfoCard',function(){

    return {
        templateUrl: "userInfoCard.prtl.html",
        restrict : "E",
        scope: {
            user : "=",
            initialCollapsed : "@collapsed"
        },
        controller : function($scope){

            $scope.collapsed = ($scope.initialCollapsed == "true");

            $scope.knightMe = function(user){
                user.rank = "knight";
            };

            $scope.collapse = function(){
                $scope.collapsed = !$scope.collapsed;
            }

            $scope.$on('deleteUser', function (event, data) {
                console.log(event);
                console.log(data);
                window.alert("user deleted "+data);
            });

            $scope.deleteUser = function(userToDel){
                $scope.$emit('deleteUser', userToDel);
            }
        }
    }

});

angular.module('app').directive('address', function(){
    
    return {
        templateUrl: "address.prtl.html",
        restrict : "E",
        scope : true,
        controller: function($scope){
            $scope.collapsed = true;
            //$scope.
            $scope.collapseAddress = function () {
                $scope.collapsed = true;
            }
            $scope.expandAddress = function () {
                $scope.$emit('deleteUser', {name:'rama'});
                $scope.collapsed = false;
            }
        }
    }
})