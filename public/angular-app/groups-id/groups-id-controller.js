'use strict';

angular.module("groups-app").controller("groupsIdCtl", function ($scope, $stateParams, $http, researchersService) {

    $scope.id = $stateParams.id;

    $scope.refresh = function () {
        $http.get('api/v1/groups/' + $scope.id).then(function (response) {
            $scope.group = response.data;
            // GET members
            researchersService.getResearchersByGroups($scope.group._id).then(function (researchers) {
                $scope.researchers = researchers;
            }, function (error) {
                console.log(error);
                if (error.code === 404) {
                    $scope.researchers = [];
                }
            });
        });
    };

    $scope.refresh();

});