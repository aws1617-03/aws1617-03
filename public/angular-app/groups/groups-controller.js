'use strict';

angular.module("groups-app").controller("groupsCtl", function ($scope, $rootScope, $http) {

    $scope.apikey = $rootScope.apikey;

    $scope.refresh = function () {
        if (!$rootScope.apikey) {
            $rootScope.apikey = $scope.apikey;
        }

        $http.get("/api/v1/groups?apikey=" + $scope.apikey).then(function (response) {
            $scope.groups = response.data;
        });
    }

    $scope.addGroup = function () {
        console.log("Adding group " + $scope.newGroup);
        $http.post("/api/v1/groups?apikey=" + $scope.apikey, $scope.newGroup).then(function () {
            $scope.refresh();
        });

    };

    $scope.deleteGroup = function (group) {
        $http.delete('/api/v1/groups/' + group.name + "?apikey=" + $scope.apikey).then((response) => {
            $scope.refresh();
        });
    };

    $scope.updateGroup = function () {
        $http.put('/api/v1/groups/' + $scope.latestName + "?apikey=" + $scope.apikey, $scope.newGroup).then((response) => {

            console.log(response);
            if (response.status != 200) {
                error();
            } else {
                $scope.refresh();
                $scope.newGroup = {};
                $('#myModal').modal('hide');
            }

        });
    };

    function error() {

    }

    $scope.openModal = function (group) {
        if (group) {
            $scope.latestName = group.name;
            $scope.newGroup = group;
            $('#myModal').modal('show');
        }
    };

    $scope.refresh();
});