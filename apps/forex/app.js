var app = angular.module("currencyConvModule",[]);

app.controller("converterCtrl",["$scope","$http","currencyConvSvc",function($scope,$http,currencyConvSvc){
    console.log("Hi ctrl");
    $scope.currencyToDisplay = false;
    $scope.currency = {source:"USA",target:"IND"};
    $scope.onCountryChange = function(type){
        console.log(type);
        if(type == 0){
            var targetType = "source";
        }else{
            var targetType = "target";
        }
        currencyConvSvc.getCountryInf($scope.currency[targetType]).then(function (countryData) {
            console.log(countryData);
            $scope.currency[targetType+"ImgUrl"] = "http://www.worldatlas.com/webimage/flags/countrys/zzzflags/"+countryData.alpha2Code.toLowerCase()+"large.gif"
            $scope.currency[targetType+"CurrencyCode"] = countryData.currencies[0];
            $scope.convRates();
        },function (countryDataErr) {
            console.log(countryDataErr);
        })
    }

    $scope.convRates = function(){
        if(($scope.currency.hasOwnProperty("sourceCurrencyCode")) && ($scope.currency.hasOwnProperty("targetCurrencyCode")) && ($scope.amtToConvert >= 1))
        {
            $http({
                url:"http://api.fixer.io/latest",
                method:"GET",
                params: {base:$scope.currency.sourceCurrencyCode,symbols:$scope.currency.targetCurrencyCode}

            }).then(function (resp) {

                $scope.convertedCurrency = resp.data.rates[$scope.currency.targetCurrencyCode];
                console.log( $scope.convertedCurrency);
                $scope.currencyToDisplay = true;
                
            },function(err){
                console.log(err);
            })
        }

    }

    for(var i = 0;i<2;i++){
        $scope.onCountryChange(i);
    }

}]);

app.service("currencyConvSvc",["$q","$http",function($q,$http){


        this.getCountryInf = function(countryCode){

           return $http({
                url:"https://restcountries.eu/rest/v1/alpha/"+countryCode,
                method:"GET"

            }).then(function (wordBankResp) {
                console.log(wordBankResp);
                return $q.resolve(wordBankResp.data)
            },function(wordBankErr){
                console.log(wordBankErr);
                return $q.reject(wordBankErr);
            })

        }


}]);