'use strict';

angular.module("groups-app").controller("groupsCtl", function ($scope, $http) {
    
<<<<<<< HEAD
    function refresh(){
        $http.get("/api/v1/groups").then(function (response){
            $scope.groups = response.data;
        });
    };
    
    $scope.addGroup = function (){
        console.log("Adding group "+$scope.newGroup);
        $http.post("/api/v1/groups",$scope.newGroup).then(function (){
            refresh();
        });
        
    };
    
    refresh();
=======

>>>>>>> master
});