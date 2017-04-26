'use strict';

angular.module("groups-app").controller("homeCtl", function ($scope, $http, $q) {

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
  }

  $scope.seeOnGithub = function getIssueEventTitle(event) {

    switch (event.type) {

      case "IssuesEvent":
        return event.payload.issue.html_url;
        break;

      default:
        return "https://github.com/aws1617-03/aws1617-03";
        break;

    }

  }

  $scope.getDescription = function (event) {
    switch (event.type) {

      case "IssuesEvent":
        return "With title: " + event.payload.issue.title;
        break;

      default:
        return "";
        break;

    }
  }

  $scope.lintDate = function (date) {
    return moment(date).format('DD-MM-YYYY HH:mm:ss');
  }
  $scope.events = [
    {
      "id": "5715864409",
      "type": "IssuesEvent",
      "actor": {
        "id": 4376304,
        "login": "dani8art",
        "display_login": "dani8art",
        "gravatar_id": "",
        "url": "https://api.github.com/users/dani8art",
        "avatar_url": "https://avatars.githubusercontent.com/u/4376304?"
      },
      "repo": {
        "id": 85856760,
        "name": "aws1617-03/aws1617-03",
        "url": "https://api.github.com/repos/aws1617-03/aws1617-03"
      },
      "payload": {
        "action": "opened",
        "issue": {
          "url": "https://api.github.com/repos/aws1617-03/aws1617-03/issues/64",
          "repository_url": "https://api.github.com/repos/aws1617-03/aws1617-03",
          "labels_url": "https://api.github.com/repos/aws1617-03/aws1617-03/issues/64/labels{/name}",
          "comments_url": "https://api.github.com/repos/aws1617-03/aws1617-03/issues/64/comments",
          "events_url": "https://api.github.com/repos/aws1617-03/aws1617-03/issues/64/events",
          "html_url": "https://github.com/aws1617-03/aws1617-03/issues/64",
          "id": 222748732,
          "number": 64,
          "title": "Add auth0 for auth management",
          "user": {
            "login": "dani8art",
            "id": 4376304,
            "avatar_url": "https://avatars2.githubusercontent.com/u/4376304?v=3",
            "gravatar_id": "",
            "url": "https://api.github.com/users/dani8art",
            "html_url": "https://github.com/dani8art",
            "followers_url": "https://api.github.com/users/dani8art/followers",
            "following_url": "https://api.github.com/users/dani8art/following{/other_user}",
            "gists_url": "https://api.github.com/users/dani8art/gists{/gist_id}",
            "starred_url": "https://api.github.com/users/dani8art/starred{/owner}{/repo}",
            "subscriptions_url": "https://api.github.com/users/dani8art/subscriptions",
            "organizations_url": "https://api.github.com/users/dani8art/orgs",
            "repos_url": "https://api.github.com/users/dani8art/repos",
            "events_url": "https://api.github.com/users/dani8art/events{/privacy}",
            "received_events_url": "https://api.github.com/users/dani8art/received_events",
            "type": "User",
            "site_admin": false
          },
          "labels": [
            {
              "id": 566863399,
              "url": "https://api.github.com/repos/aws1617-03/aws1617-03/labels/enhancement",
              "name": "enhancement",
              "color": "84b6eb",
              "default": true
            }
          ],
          "state": "open",
          "locked": false,
          "assignee": {
            "login": "dani8art",
            "id": 4376304,
            "avatar_url": "https://avatars2.githubusercontent.com/u/4376304?v=3",
            "gravatar_id": "",
            "url": "https://api.github.com/users/dani8art",
            "html_url": "https://github.com/dani8art",
            "followers_url": "https://api.github.com/users/dani8art/followers",
            "following_url": "https://api.github.com/users/dani8art/following{/other_user}",
            "gists_url": "https://api.github.com/users/dani8art/gists{/gist_id}",
            "starred_url": "https://api.github.com/users/dani8art/starred{/owner}{/repo}",
            "subscriptions_url": "https://api.github.com/users/dani8art/subscriptions",
            "organizations_url": "https://api.github.com/users/dani8art/orgs",
            "repos_url": "https://api.github.com/users/dani8art/repos",
            "events_url": "https://api.github.com/users/dani8art/events{/privacy}",
            "received_events_url": "https://api.github.com/users/dani8art/received_events",
            "type": "User",
            "site_admin": false
          },
          "assignees": [
            {
              "login": "dani8art",
              "id": 4376304,
              "avatar_url": "https://avatars2.githubusercontent.com/u/4376304?v=3",
              "gravatar_id": "",
              "url": "https://api.github.com/users/dani8art",
              "html_url": "https://github.com/dani8art",
              "followers_url": "https://api.github.com/users/dani8art/followers",
              "following_url": "https://api.github.com/users/dani8art/following{/other_user}",
              "gists_url": "https://api.github.com/users/dani8art/gists{/gist_id}",
              "starred_url": "https://api.github.com/users/dani8art/starred{/owner}{/repo}",
              "subscriptions_url": "https://api.github.com/users/dani8art/subscriptions",
              "organizations_url": "https://api.github.com/users/dani8art/orgs",
              "repos_url": "https://api.github.com/users/dani8art/repos",
              "events_url": "https://api.github.com/users/dani8art/events{/privacy}",
              "received_events_url": "https://api.github.com/users/dani8art/received_events",
              "type": "User",
              "site_admin": false
            }
          ],
          "milestone": {
            "url": "https://api.github.com/repos/aws1617-03/aws1617-03/milestones/1",
            "html_url": "https://github.com/aws1617-03/aws1617-03/milestone/1",
            "labels_url": "https://api.github.com/repos/aws1617-03/aws1617-03/milestones/1/labels",
            "id": 2404765,
            "number": 1,
            "title": "v1.0.0",
            "description": "",
            "creator": {
              "login": "dani8art",
              "id": 4376304,
              "avatar_url": "https://avatars2.githubusercontent.com/u/4376304?v=3",
              "gravatar_id": "",
              "url": "https://api.github.com/users/dani8art",
              "html_url": "https://github.com/dani8art",
              "followers_url": "https://api.github.com/users/dani8art/followers",
              "following_url": "https://api.github.com/users/dani8art/following{/other_user}",
              "gists_url": "https://api.github.com/users/dani8art/gists{/gist_id}",
              "starred_url": "https://api.github.com/users/dani8art/starred{/owner}{/repo}",
              "subscriptions_url": "https://api.github.com/users/dani8art/subscriptions",
              "organizations_url": "https://api.github.com/users/dani8art/orgs",
              "repos_url": "https://api.github.com/users/dani8art/repos",
              "events_url": "https://api.github.com/users/dani8art/events{/privacy}",
              "received_events_url": "https://api.github.com/users/dani8art/received_events",
              "type": "User",
              "site_admin": false
            },
            "open_issues": 2,
            "closed_issues": 31,
            "state": "open",
            "created_at": "2017-03-22T17:35:11Z",
            "updated_at": "2017-04-19T14:02:00Z",
            "due_on": null,
            "closed_at": null
          },
          "comments": 0,
          "created_at": "2017-04-19T14:02:00Z",
          "updated_at": "2017-04-19T14:02:00Z",
          "closed_at": null,
          "body": ""
        }
      },
      "public": true,
      "created_at": "2017-04-19T14:02:00Z",
      "org": {
        "id": 26606213,
        "login": "aws1617-03",
        "gravatar_id": "",
        "url": "https://api.github.com/orgs/aws1617-03",
        "avatar_url": "https://avatars.githubusercontent.com/u/26606213?"
      }
    },
    {
      "id": "5715846191",
      "type": "IssuesEvent",
      "actor": {
        "id": 4376304,
        "login": "dani8art",
        "display_login": "dani8art",
        "gravatar_id": "",
        "url": "https://api.github.com/users/dani8art",
        "avatar_url": "https://avatars.githubusercontent.com/u/4376304?"
      },
      "repo": {
        "id": 85856760,
        "name": "aws1617-03/aws1617-03",
        "url": "https://api.github.com/repos/aws1617-03/aws1617-03"
      },
      "payload": {
        "action": "opened",
        "issue": {
          "url": "https://api.github.com/repos/aws1617-03/aws1617-03/issues/63",
          "repository_url": "https://api.github.com/repos/aws1617-03/aws1617-03",
          "labels_url": "https://api.github.com/repos/aws1617-03/aws1617-03/issues/63/labels{/name}",
          "comments_url": "https://api.github.com/repos/aws1617-03/aws1617-03/issues/63/comments",
          "events_url": "https://api.github.com/repos/aws1617-03/aws1617-03/issues/63/events",
          "html_url": "https://github.com/aws1617-03/aws1617-03/issues/63",
          "id": 222748096,
          "number": 63,
          "title": "Add materialize as CSS framework",
          "user": {
            "login": "dani8art",
            "id": 4376304,
            "avatar_url": "https://avatars2.githubusercontent.com/u/4376304?v=3",
            "gravatar_id": "",
            "url": "https://api.github.com/users/dani8art",
            "html_url": "https://github.com/dani8art",
            "followers_url": "https://api.github.com/users/dani8art/followers",
            "following_url": "https://api.github.com/users/dani8art/following{/other_user}",
            "gists_url": "https://api.github.com/users/dani8art/gists{/gist_id}",
            "starred_url": "https://api.github.com/users/dani8art/starred{/owner}{/repo}",
            "subscriptions_url": "https://api.github.com/users/dani8art/subscriptions",
            "organizations_url": "https://api.github.com/users/dani8art/orgs",
            "repos_url": "https://api.github.com/users/dani8art/repos",
            "events_url": "https://api.github.com/users/dani8art/events{/privacy}",
            "received_events_url": "https://api.github.com/users/dani8art/received_events",
            "type": "User",
            "site_admin": false
          },
          "labels": [
            {
              "id": 566863399,
              "url": "https://api.github.com/repos/aws1617-03/aws1617-03/labels/enhancement",
              "name": "enhancement",
              "color": "84b6eb",
              "default": true
            }
          ],
          "state": "open",
          "locked": false,
          "assignee": null,
          "assignees": [

          ],
          "milestone": {
            "url": "https://api.github.com/repos/aws1617-03/aws1617-03/milestones/1",
            "html_url": "https://github.com/aws1617-03/aws1617-03/milestone/1",
            "labels_url": "https://api.github.com/repos/aws1617-03/aws1617-03/milestones/1/labels",
            "id": 2404765,
            "number": 1,
            "title": "v1.0.0",
            "description": "",
            "creator": {
              "login": "dani8art",
              "id": 4376304,
              "avatar_url": "https://avatars2.githubusercontent.com/u/4376304?v=3",
              "gravatar_id": "",
              "url": "https://api.github.com/users/dani8art",
              "html_url": "https://github.com/dani8art",
              "followers_url": "https://api.github.com/users/dani8art/followers",
              "following_url": "https://api.github.com/users/dani8art/following{/other_user}",
              "gists_url": "https://api.github.com/users/dani8art/gists{/gist_id}",
              "starred_url": "https://api.github.com/users/dani8art/starred{/owner}{/repo}",
              "subscriptions_url": "https://api.github.com/users/dani8art/subscriptions",
              "organizations_url": "https://api.github.com/users/dani8art/orgs",
              "repos_url": "https://api.github.com/users/dani8art/repos",
              "events_url": "https://api.github.com/users/dani8art/events{/privacy}",
              "received_events_url": "https://api.github.com/users/dani8art/received_events",
              "type": "User",
              "site_admin": false
            },
            "open_issues": 1,
            "closed_issues": 31,
            "state": "open",
            "created_at": "2017-03-22T17:35:11Z",
            "updated_at": "2017-04-19T13:59:50Z",
            "due_on": null,
            "closed_at": null
          },
          "comments": 0,
          "created_at": "2017-04-19T13:59:50Z",
          "updated_at": "2017-04-19T13:59:50Z",
          "closed_at": null,
          "body": ""
        }
      },
      "public": true,
      "created_at": "2017-04-19T13:59:50Z",
      "org": {
        "id": 26606213,
        "login": "aws1617-03",
        "gravatar_id": "",
        "url": "https://api.github.com/orgs/aws1617-03",
        "avatar_url": "https://avatars.githubusercontent.com/u/26606213?"
      }
    }];

  $scope.collaborators = [
    {
      "login": "octocat",
      "id": 1,
      "avatar_url": "https://avatars.githubusercontent.com/u/4376304?",
      "gravatar_id": "",
      "url": "https://api.github.com/users/octocat",
      "html_url": "https://github.com/octocat",
      "followers_url": "https://api.github.com/users/octocat/followers",
      "following_url": "https://api.github.com/users/octocat/following{/other_user}",
      "gists_url": "https://api.github.com/users/octocat/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/octocat/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/octocat/subscriptions",
      "organizations_url": "https://api.github.com/users/octocat/orgs",
      "repos_url": "https://api.github.com/users/octocat/repos",
      "events_url": "https://api.github.com/users/octocat/events{/privacy}",
      "received_events_url": "https://api.github.com/users/octocat/received_events",
      "type": "User",
      "site_admin": false,
      "permissions": {
        "pull": true,
        "push": true,
        "admin": false
      }
    }
  ]
});
