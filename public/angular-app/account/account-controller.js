'use strict';

angular.module("groups-app").controller("accountCtl", function ($scope) {

    $scope.account = JSON.parse(localStorage.getItem('userInfo'));
    $scope.token = localStorage.getItem('id_token');

});