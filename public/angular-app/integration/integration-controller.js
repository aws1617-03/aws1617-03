'use strict';

angular.module("groups-app").controller("integrationCtl", function ($scope, $rootScope, $http, $timeout) {


  
  $scope.getResearchers = function () {
            //Researchers
            $http.get("https://aws1617-02.herokuapp.com/api/v1/researchers", { headers: {'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0OTI3NjYyMjQsImV4cCI6MTQ5Mzk3NTgyNH0.WExNusVFHUcM6LKCwp3cz2SudqM1-CWF3DCZZIPNF-E'}}).then(function (response) {
                $scope.researchers = response.data;
                $scope.projects= {};
                $scope.universities= {};
                $scope.groups= {};
                
                //Groups
                for(var i=0; i<$scope.researchers.length; i++){
                    $http.get("/api/v1/groups/"+$scope.researchers[i].group).then(function (response) {
                
                    $scope.groups[$scope.researchers[i-1]._id] = response.data;
                    }, function (err) {
                            error(err.data);
                    });
                }
                
                //Projects
                for(var t=0; t<$scope.researchers.length; t++){
                    $scope.projects[$scope.researchers[t]._id] = [];
                    for(var j=0; j<$scope.researchers[t].projects.length; j++){
                        $http.get("https://aws1617-01.herokuapp.com/api/v1/projects/"+$scope.researchers[t].projects[j]).then(function (response) {
                        $scope.projects[$scope.researchers[t-1]._id] = response.data;
                        }, function (err) {
                            error(err.data);
                        });
                    }
                }
                
                //Universities
                for(var m=0; m<$scope.researchers.length; m++){
                    $http.get("https://aws1617-04.herokuapp.com/api/v1/universities/"+$scope.researchers[m].university).then(function (response) {
                    $scope.universities[$scope.researchers[m-1]._id] = response.data;
                     console.log(m);
                     console.log($scope.universities[m-1]);
                    }, function (err) {
                        error(err.data);
                    });
                }                   
            
            }, function (err) {
                error(err.data);
            });
            
           

    };
    
    $scope.comparatorFunction = function (name, search) {
        return ('' + name).indexOf('' + search) > -1;
    };
    
    function error(data) {
        if (data.code) {
            $scope.error = data;
        } else {
            $scope.error = {
                code: 500,
                message: "Unexpected error."
            };
        }
    }
    
    function message(msg) {
        $scope.message = msg;
        $timeout($scope.cleanMessage, 6000);
    }


    
    $scope.getResearchers();
});