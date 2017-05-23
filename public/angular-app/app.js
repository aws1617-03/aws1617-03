'use strict';

angular.module("groups-app", ['auth0.auth0', 'angular-jwt', 'ui.router', 'ngAnimate'])
    .config(function ($httpProvider, $stateProvider, $locationProvider, $urlRouterProvider, angularAuth0Provider, jwtOptionsProvider, jwtInterceptorProvider) {

        $urlRouterProvider.otherwise("/");

        angularAuth0Provider.init({
            clientID: 'ERBtyxsi5JTCOTXe7tqpxzHUfZWEKNKT',
            domain: 'dani8art.eu.auth0.com',
            responseType: 'token id_token',
            redirectUri: window.location.href
        });

        jwtOptionsProvider.config({
            tokenGetter: function () {
                return localStorage.getItem('id_token');
            },
            whiteListedDomains: ['api.github.com']
        });

        jwtInterceptorProvider.tokenGetter = function () {
            return localStorage.getItem('id_token');
        };

        $httpProvider.interceptors.push('jwtInterceptor');

        $locationProvider.hashPrefix('');

        $stateProvider
            .state('site', {
                abstract: true,
                views: {
                    'navbar@': {
                        templateUrl: 'angular-app/navbar/navbar-template.html',
                        controller: 'navbarCtl'
                    },
                    'footer@': {
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

            }).state('groupsId', {

                url: '/groups/:id',
                parent: 'site',
                views: {
                    'content@': {
                        templateUrl: 'angular-app/groups-id/groups-id-template.html',
                        controller: 'groupsIdCtl'
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

            }).state('account', {

                url: '/account',
                parent: 'site',
                views: {
                    'content@': {
                        templateUrl: 'angular-app/account/account-template.html',
                        controller: 'accountCtl'
                    }
                }

            });

    }).run(function ($http, $rootScope, authService, authManager) {

        authService.handleParseHash();
        authManager.checkAuthOnRefresh();

    });