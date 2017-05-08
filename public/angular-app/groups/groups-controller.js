'use strict';

angular.module("groups-app").controller("groupsCtl", function ($scope, $rootScope, $http, $timeout) {

    $scope.apikey = $rootScope.apikey;
    $scope.viewMode = "table";
    $scope.refresh = function () {
        $scope.cleanError();
        if (!$rootScope.apikey) {
            $rootScope.apikey = $scope.apikey;
        }
        $http.get("/api/v1/groups?apikey=" + $scope.apikey).then(function (response) {
            $scope.groups = response.data;
            $('.modal').modal();
        }, function (err) {
            if ($scope.apikey) {
                error(err.data);
            }
        });
    };

    $scope.addGroup = function () {
        $scope.cleanError();
        $http.post("/api/v1/groups?apikey=" + $scope.apikey, $scope.newGroup).then(function (response) {
            if (response.status != 201) {
                error(response.data);
            } else {
                $scope.refresh();
                message('Group added.');
                clean();
            }
        }, function (err) {
            error(err.data);
        });

    };

    $scope.deleteGroup = function (group) {
        $scope.cleanError();
        $http.delete('/api/v1/groups/' + group.name + "?apikey=" + $scope.apikey).then((response) => {

            if (response.status != 200) {
                error(response.data);
            } else {
                $scope.refresh();
                message('Group deleted.');
                clean();
            }

        }, function (err) {
            error(err.data);
        });
    };

    $scope.updateGroup = function () {
        $scope.cleanError();
        $http.put('/api/v1/groups/' + $scope.latestName + "?apikey=" + $scope.apikey, $scope.newGroup).then((response) => {

            if (response.status != 200) {
                error(response.data);
            } else {
                $scope.refresh();
                clean();
                message('Group updated.');
            }

        }, function (err) {
            error(err.data);
        });
    };

    $scope.cleanError = function () {
        $scope.error = null;
    };

    function error(data) {
        clean();
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

    $scope.cleanMessage = function () {
        $scope.message = null;
    };

    function load() {

    }

    function clean() {
        $scope.newGroup = {};
        $('#editModal').modal('close');
    }

    $scope.openModal = function (action, group) {
        if (group && action == 'update') {
            $scope.latestName = group.name;
            $scope.newGroup = group;
            $scope.modalMode = 'update';
            $('#editModal').modal('open');
        } else if (action == 'create') {
            $scope.newGroup = {};
            $scope.modalMode = 'create';
            $('#editModal').modal('open');
        }
    };

    $scope.close = function (group) {
        if (group) {
            $scope.latestName = group.name;
            $scope.newGroup = group;
            $('#editModal').modal('close');
        }
    };

    $scope.refresh();
});