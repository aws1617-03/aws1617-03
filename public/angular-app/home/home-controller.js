'use strict';

angular.module("groups-app").controller("homeCtl", function ($scope, $http, $q, $rootScope) {

  $http.defaults.headers.common.Authorization = $rootScope.Authorization;

  $http.get("https://api.github.com/repos/aws1617-03/aws1617-03/events?per_page=8&page=1").then(function (response) {
    $scope.events = response.data;
  }, function (response) {
    console.log(response);
  });

  $http.get("https://api.github.com/repos/aws1617-03/aws1617-03/collaborators").then(function (response) {

    var promises = [];
    response.data.forEach(function (element) {
      promises.push($http.get(element.url));
    });

    $q.all(promises).then(function (collaborators) {
      $scope.collaborators = collaborators.map(function (element) { return element.data; });
    }, function () { });

  }, function (response) {
    console.log(response);
  });

  $scope.getTitle = function (event) {
    switch (event.type) {
      case "CreateEvent":
        return "New " + event.payload.ref_type + " named " + event.payload.ref + " was created";

      case "IssuesEvent":
        return "An Issue was " + event.payload.action;

      case "PushEvent":
        return "New push to " + event.payload.ref.split('/').pop();

      case "DeleteEvent":
        return event.payload.ref_type + " " + event.payload.ref + " was deleted";

      default:
        return "Card Title";
    }
  };

  $scope.seeOnGithub = function getIssueEventTitle(event) {

    switch (event.type) {

      case "IssuesEvent":
        return event.payload.issue.html_url;

      default:
        return "https://github.com/aws1617-03/aws1617-03";

    }

  };

  $scope.getDescription = function (event) {
    switch (event.type) {

      case "IssuesEvent":
        return "With title: " + event.payload.issue.title;

      default:
        return "";

    }
  };

  $scope.lintDate = function (date) {
    return moment(date).format('DD-MM-YYYY HH:mm:ss');
  };

  $scope.events = [];

  $scope.collaborators = [];

});
