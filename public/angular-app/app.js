'use strict';

angular.module("groups-app", ['ui.router'])
    .config(function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state('site', {
                abstract: true,
                views: {}

            }).state('helps', {

                url: '/',
                parent: 'site',
                views: {
                    'content@': {
                        templateUrl: 'angular-app/home/home-template.html',
                        controller: 'homeCtl'
                    }
                }

            }).state('groups', {

                url: '/groups',
                parent: 'site',
                views: {
                    'content@': {
                        templateUrl: 'angular-app/groups/groups-template.html',
                        controller: 'groupsCtl'
                    }
                }

            });
    });