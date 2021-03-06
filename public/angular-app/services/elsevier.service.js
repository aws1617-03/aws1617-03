'use strict';

angular
    .module('groups-app')
    .service('elsevierService', function elsevierService($http, $q) {

        var url = "http://sabius.services.governify.io/api/v1/elsevier/content";
        var apikey = "8482cd54c09f4a1d3bab52d46fde965f";

        function getPublicationsPerAgeByResercher(orcid) {
            var author = {
                orcid: orcid
            };
            return $q(function (resolve, reject) {
                $http.get(url + "/search/author?apikey=" + apikey + "&query=ORCID(" + orcid + ")").then(function (response) {
                    var orcidSearchResult = response.data;
                    if (!orcidSearchResult["search-results"].entry[0]["dc:identifier"]) {
                        return resolve({
                            code: 404,
                            message: "Author with ORCID=" + orcid + " not found"
                        });
                    }
                    author.scopusId = orcidSearchResult["search-results"].entry[0]["dc:identifier"].split(':')[1];
                    author.totalDocuments = parseInt(orcidSearchResult["search-results"].entry[0]['document-count']);

                    $http.get(url + "/search/scopus?apikey=" + apikey + "&query=AU-ID(" + author.scopusId + ")&count=" + author.totalDocuments).then(function (response) {
                        author.code = 200;

                        author.publications = response.data["search-results"].entry.map(function (element) {
                            return {
                                title: element['dc:title'],
                                agrupation: element['prism:aggregationType'],
                                coverDate: element['prism:coverDate'],
                                citedby: element['citedby-count'],
                                affiliation: element.affiliation,
                                dc: element["dc:identifier"].split(':')[1]
                            };
                        });

                        resolve(author);
                    }, function (response) {
                        reject({
                            code: response.status,
                            message: response.data
                        });
                    });

                }, function (response) {
                    reject({
                        code: response.status,
                        message: response.data
                    });
                });
            });
        }

        function getResercherRelationsShips(orcid) {
            return $q(function (resolve, reject) {

                getPublicationsPerAgeByResercher(orcid).then(function (author) {
                    var publications = author.publications;

                    var promises = [];
                    publications.forEach(function (element) {
                        promises.push(getCreatorsByDc(element.dc));
                    });

                    var relationsShips = [];
                    $q.all(promises).then(function (creatorsResults) {
                        creatorsResults.forEach(function (creators) {
                            creators.forEach(function (c) {
                                if (relationsShips.indexOf(c) === -1) {
                                    relationsShips.push(c);
                                }
                            });
                        });
                        resolve(relationsShips);
                    }, reject);
                });

            });

        }

        function getCreatorsByDc(dc) {
            return $q(function (resolve, reject) {
                $http.get(url + "/abstract/scopus_id/" + dc + "?apikey=" + apikey + "&httpAccept=application/json").then(function (response) {
                    resolve(response.data['abstracts-retrieval-response'].authors.author.map(function (author) {
                        return author['ce:indexed-name'];
                    }));
                }, reject);
            });
        }

        return {
            getPublicationsPerAgeByResercher: getPublicationsPerAgeByResercher,
            getResercherRelationsShips: getResercherRelationsShips
        };
    });
