'use strict';

angular.module("groups-app").controller("accountCtl", function ($scope, $http) {

    $scope.account = JSON.parse(localStorage.getItem('userInfo'));
    $scope.token = localStorage.getItem('id_token');

    $scope.create = function () {
        $http.post("https://dani8art.eu.auth0.com/api/v2/clients", {
            "name": "test",
            "description": "test",
            "callbacks": [
                "http://localhost/callbacks"
            ],
        }, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('id_token')
            }
        }).then(function (response) {
            console.log(response);
        });
    };
});