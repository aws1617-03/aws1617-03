'use strict';

angular
    .module('groups-app')
    .service('researchersService', function researchersService($http, $q) {

        var url = "https://aws1617-02.herokuapp.com/api/v1/researchers";
        var token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0OTI3NjYyMjQsImV4cCI6MTQ5Mzk3NTgyNH0.WExNusVFHUcM6LKCwp3cz2SudqM1-CWF3DCZZIPNF-E";

        var options = {
            headers: {
                Authorization: "Bearer " + token
            }
        };

        function getResearchersByGroups(id) {
            return $q(function (resolve, reject) {
                $http.get(url + "?group=" + id, options).then(function (response) {
                    resolve(response.data);
                }, function (response) {
                    reject({
                        code: response.status,
                        message: response.data
                    });
                });
            });
        }

        return {
            getResearchersByGroups: getResearchersByGroups
        };
    });