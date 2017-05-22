'use strict';

angular.module("groups-app").controller("groupsIdCtl", function ($scope, $stateParams) {

    $scope.id = $stateParams.id;

});