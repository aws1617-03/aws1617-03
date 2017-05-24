'use strict';

angular.module("groups-app").controller("integrationCtl", function ($scope, $rootScope, $http, $timeout, $q) {

    $scope.loading = true;

    function getResearchers() {
        return $q(function (resolve, reject) {
            $http.get("https://aws1617-02.herokuapp.com/api/v1/researchers", {
                headers: {
                    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0OTI3NjYyMjQsImV4cCI6MTQ5Mzk3NTgyNH0.WExNusVFHUcM6LKCwp3cz2SudqM1-CWF3DCZZIPNF-E'
                }
            }).then(function (response) {
                resolve(response.data)
            }, function (response) {
                reject({
                    code: response.status,
                    message: response.data
                });
            });
        });

    }

    $scope.researchers = [];
    getResearchers().then(function (researchers) {

        var promises = [];
        researchers.forEach(function (element) {
            promises.push($q(function (resolve, reject) {
                $http.get("/api/v1/groups/" + element.group).then(function (response) {
                    element.group = response.data;
                    resolve(response.data);
                }, function (response) {
                    reject({
                        code: response.status,
                        message: response.data
                    });
                });
            }));
        });

        researchers.forEach(function (element) {
            promises.push($q(function (resolve, reject) {
                $http.get("https://aws1617-04.herokuapp.com/api/v1/universities/" + element.university).then(function (response) {
                    element.university = response.data;
                    resolve(response.data);
                }, function (response) {
                    reject({
                        code: response.status,
                        message: response.data
                    });
                });
            }));
        });

        researchers.forEach(function (element) {
            promises.push($q(function (resolve, reject) {
                var projectPromises = [];
                element.projects.forEach(function (project) {
                    projectPromises.push($q(function (res, rej) {

                        $http.get("https://aws1617-01.herokuapp.com/api/v1/projects/" + project).then(function (response) {
                            res(response.data[0]);
                        }, function (response) {
                            rej({
                                code: response.status,
                                message: response.data
                            });
                        });
                    }));
                });

                $q.all(projectPromises).then(function (projects) {
                    element.projects = projects;
                    resolve();
                }, reject);

            }));
        });

        $q.all(promises).then(function (groups) {
            $scope.researchers = researchers;
            $scope.loading = false;
            console.log(researchers);
        });
    }, function (error) {
        console.log(error);
    });


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



    // $scope.getResearchers();
});