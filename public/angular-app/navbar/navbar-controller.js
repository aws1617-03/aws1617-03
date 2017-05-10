'use strict';

angular.module("groups-app").controller("navbarCtl", function ($scope, $http, $rootScope, authService, $interval, $timeout) {

    $scope.authService = authService;

    $timeout(function () {
        $(".button-collapse").sideNav();
    }, 1000);


    $scope.userInfo = JSON.parse(localStorage.getItem('userInfo')) || null;

    var interval = $interval(function () {
        if (!$scope.userInfo) {
            $scope.userInfo = JSON.parse(localStorage.getItem('userInfo')) || null;
        } else {
            interval = null;
        }
    }, 500);
});
