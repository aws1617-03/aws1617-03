'use strict';

angular
    .module('groups-app')
    .service('d3Service', function elsevierService($http, $q) {

        function buildDependenciGraps(main, relationships) {
            return $q(function (resolve, reject) {
                var chart = d3.chart.dependencyWheel()
                    .width(500) // also used for height, since the wheel is in a a square
                    .margin(150) // used to display package names
                    .padding(.02);
                var matrix = (function () {
                    var ret = [];
                    [main].concat(relationships).forEach(function (element, index) {
                        var row = [0];
                        for (var i = 0; i <= relationships.length; i++) {
                            if (index === 0) {
                                if (index === i) {
                                    row.push(0);
                                } else {
                                    row.push(1);
                                }
                            } else {
                                if (index === i) {
                                    row.push(1);
                                } else {
                                    row.push(0);
                                }
                            }
                        }
                        ret.push(row);
                    });
                    return ret;
                })();

                var data = {
                    packageNames: [main].concat(relationships),
                    matrix: matrix
                };

                // [
                //         [0, 1, 1, 0], // Main depends on A and B
                //         [0, 0, 1, 0], // A depends on B
                //         [0, 0, 0, 0],
                //         [0, 1, 0, 0]
                //     ] // B doesn't depend on A or Main

                d3.select('#dependencyChart')
                    .datum(data)
                    .call(chart);

                resolve();
            });

        }

        return {
            buildDependenciGraps: buildDependenciGraps
        };
    });