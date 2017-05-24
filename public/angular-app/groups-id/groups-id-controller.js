'use strict';

angular.module("groups-app").controller("groupsIdCtl", function ($scope, $stateParams, $http, researchersService, elsevierService, $q, $timeout, gchartService, d3Service) {

    $scope.id = $stateParams.id;

    $scope.refresh = refresh;

    $scope.loading = true;

    function refresh() {
        return $q(function (resolve, reject) {
            var publicationsPerYearsLastFive = [];
            $http.get('api/v1/groups/' + $scope.id).then(function (response) {
                $('.modal').modal();
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

    $scope.loadD3Chart = function (orcid, main) {
        $scope.showD3 = true;
        $scope.relationShipLoading = true;
        $scope.relatioshipname = main;
        $('#d3Chart').modal('open');
        elsevierService.getResercherRelationsShips(orcid).then(function (relationships) {
            console.log(relationships);
            d3Service.buildDependenciGraps(main, relationships).then(function () {
                $scope.relationShipLoading = false;
            });
        }, function (error) {
            console.log(error);
        });
    };

    $scope.refresh().then(function (results) {
        console.log(results);
        $scope.group = results.group;
        $scope.researchers = results.researchers;
        $scope.loading = false;
        $timeout(function () {
            gchartService.drawPublicationsPerYears(results.yearsCount);
            gchartService.drawPublicationTypes(results.documentsTypesCount);
            gchartService.drawCitesPerYears(results.yearsCount);
            gchartService.drawCollaborationMap(results.collaborations);
        }, 500);

    }, function (error) {
        $scope.group = {};
        $scope.researchers = [];
    });

});