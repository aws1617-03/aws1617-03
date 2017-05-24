'use strict';

angular
    .module('groups-app')
    .service('d3Service', function elsevierService($http, $q) {

        function buildDependenciGraps() {
            var chart = d3.chart.dependencyWheel();

            var data = {
                packageNames: ['Main', 'A', 'B', 'C'],
                matrix: [
                    [0, 1, 1, 0], // Main depends on A and B
                    [0, 0, 1, 0], // A depends on B
                    [0, 0, 0, 0],
                    [0, 1, 0, 0]
                ] // B doesn't depend on A or Main
            };

            d3.select('#dependencyChart')
                .datum(data)
                .call(chart);
        }

        return {
            buildDependenciGraps: buildDependenciGraps
        };
    });