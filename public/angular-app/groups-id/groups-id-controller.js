'use strict';

angular.module("groups-app").controller("groupsIdCtl", function ($scope, $stateParams, $http, researchersService, elsevierService, $q, $timeout) {

    google.charts.load('current', {
        packages: ['corechart', 'bar', 'geochart']
    });

    $scope.id = $stateParams.id;

    $scope.refresh = refresh;

    $scope.loading = true;

    function refresh() {
        return $q(function (resolve, reject) {
            var publicationsPerYearsLastFive = [];
            $http.get('api/v1/groups/' + $scope.id).then(function (response) {
                var group = response.data;
                // GET members
                researchersService.getResearchersByGroups(group._id).then(function (researchers) {
                    var promises = [];

                    researchers.forEach(function (element) {
                        promises.push(elsevierService.getPublicationsPerAgeByResercher(element.orcid));
                    });

                    $q.all(promises).then(function (promisesResults) {
                        console.log(promisesResults);
                        var currentYear = parseInt(new Date().getFullYear());
                        var yearsCount = {};
                        for (var i = currentYear; i >= currentYear - 5; i--) {
                            yearsCount[i] = {
                                count: 0,
                                citations: 0
                            };
                        }
                        var documentsTypesCount = {};
                        var totalGroup = 0;
                        var groupCitations = 0;
                        var collaborations = [];
                        promisesResults.forEach(function (element) {
                            if (element.code === 200) {
                                totalGroup += element.totalDocuments;
                                element.publications.forEach(function (doc) {
                                    groupCitations += parseInt(doc.citedby);
                                    for (var y in yearsCount) {
                                        if (doc.coverDate.indexOf(y) !== -1) {
                                            yearsCount[y].count += 1;
                                            yearsCount[y].citations += parseInt(doc.citedby);
                                        }
                                    }

                                    doc.affiliation.forEach(function (element) {
                                        if (element['affiliation-city'] !== 'Sevilla') {
                                            collaborations.push(element);
                                        }

                                    });

                                    documentsTypesCount[doc.agrupation] = documentsTypesCount[doc.agrupation] == null ? 1 : documentsTypesCount[doc.agrupation] + 1;
                                });
                            }
                        });
                        group.totalDocuments = totalGroup;
                        group.citations = groupCitations;
                        console.log(collaborations);
                        console.log(documentsTypesCount);
                        resolve({
                            group: group,
                            researchers: researchers,
                            yearsCount: yearsCount,
                            documentsTypesCount: documentsTypesCount,
                            collaborations: collaborations
                        });
                    });

                }, reject);
            }, reject);
        });

    }

    //elsevierService.getPublicationsPerAgeByResercher("0000-0001-9827-1834");

    $scope.refresh().then(function (results) {
        $scope.group = results.group;
        $scope.researchers = results.researchers;
        $scope.loading = false;
        $timeout(function () {
            drawPublicationsPerYears(results.yearsCount);
            drawPublicationTypes(results.documentsTypesCount);
            drawCitesPerYears(results.yearsCount);
            drawCollaborationMap(results.collaborations);
        }, 500);

    }, function (error) {
        $scope.group = {};
        $scope.researchers = [];
    });


    //CHARTS FUNCTIONS

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
});