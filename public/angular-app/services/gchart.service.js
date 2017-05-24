'use strict';

angular
    .module('groups-app')
    .service('gchartService', function researchersService() {

        google.charts.load('current', {
            packages: ['corechart', 'bar', 'geochart']
        });

        function drawCollaborationMap(collaborations) {
            var counts = {};
            collaborations.forEach(function (element) {
                counts[element['affiliation-country']] = counts[element['affiliation-country']] ? counts[element['affiliation-country']] + 1 : 1;
            });
            console.log(counts);
            var array = [
                ['Country', 'Collaborations']
            ];

            for (var aff in counts) {
                array.push([aff, counts[aff]]);
            }
            var data = google.visualization.arrayToDataTable(array);

            var options = {};

            var chart = new google.visualization.GeoChart(document.getElementById('collaborations_chart'));

            chart.draw(data, options);
        }

        function drawPublicationsPerYears(yearsCount) {
            var array = [
                ['Year', 'Count']
            ];
            for (var y in yearsCount) {
                array.push([y, yearsCount[y].count]);
            }
            var data = google.visualization.arrayToDataTable(array);

            var options = {
                chartArea: {
                    width: '70%'
                },
                hAxis: {
                    minValue: 0,
                    textStyle: {
                        bold: true,
                        fontSize: 12,
                        color: '#4d4d4d'
                    }
                },
                vAxis: {
                    textStyle: {
                        fontSize: 14,
                        bold: true,
                        color: '#848484'
                    }
                }
            };
            var chart = new google.visualization.BarChart(document.getElementById('pub_per_year'));
            chart.draw(data, options);
        }

        function drawCitesPerYears(yearsCount) {
            var array = [
                ['Year', 'Cites']
            ];
            for (var y in yearsCount) {
                array.push([y, yearsCount[y].citations]);
            }
            var data = google.visualization.arrayToDataTable(array);

            var options = {
                chartArea: {
                    width: '70%'
                },
                colors: ['red'],
                hAxis: {
                    minValue: 0,
                    textStyle: {
                        bold: true,
                        fontSize: 12,
                        color: '#4d4d4d'
                    }
                },
                vAxis: {
                    textStyle: {
                        fontSize: 14,
                        bold: true,
                        color: '#848484'
                    }
                }
            };
            var chart = new google.visualization.LineChart(document.getElementById('cites_per_year'));
            chart.draw(data, options);
        }

        function drawPublicationTypes(documentsTypesCount) {
            var array = [
                ['Type', 'Count']
            ];
            for (var t in documentsTypesCount) {
                array.push([t, documentsTypesCount[t]]);
            }
            var data = google.visualization.arrayToDataTable(array);

            var options = {
                pieHole: 0.3,
                chartArea: {
                    left: 20,
                    top: 10,
                    width: '90%',
                    height: '90%'
                }
            };

            var chart = new google.visualization.PieChart(document.getElementById('type_of_pub'));
            chart.draw(data, options);
        }

        return {
            drawCollaborationMap: drawCollaborationMap,
            drawPublicationTypes: drawPublicationTypes,
            drawCitesPerYears: drawCitesPerYears,
            drawPublicationsPerYears: drawPublicationsPerYears
        };
    });