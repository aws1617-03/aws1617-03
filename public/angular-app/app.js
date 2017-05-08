'use strict';

angular.module("groups-app", ['ui.router', 'ngAnimate'])
    .config(function ($httpProvider, $stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise("/");


        $httpProvider.defaults.headers.common.Authorization = 'token ' + token;

        $stateProvider
            .state('site', {
                abstract: true,
                views: {
                    'navbar@': {
                        templateUrl: 'angular-app/navbar/navbar-template.html',
                        controller: 'navbarCtl'
                    }, 'footer@': {
                        templateUrl: 'angular-app/footer/footer-template.html',
                        controller: 'footerCtl'
                    }
                }

            }).state('home', {

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

            }).state('tests', {

                url: '/api/v1/tests',
                parent: 'site',
                views: {
                    'content@': {
                        templateUrl: 'angular-app/tests/tests-template.html',
                        controller: 'testsCtl'
                    }
                }

            });

    });
