'use strict';

angular.module("groups-app").controller("homeCtl", function ($scope, $http) {

    $http.get("https://api.github.com/repos/aws1617-03/aws1617-03/events?per_page=10&page=1").then(function(response){
        $scope.events = response.data;
    }, function(response){
        
    });
});
