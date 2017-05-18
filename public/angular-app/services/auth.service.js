'use strict';

angular
    .module('groups-app')
    .service('authService', function authService($state, angularAuth0, authManager) {
        function login(username, password) {
            angularAuth0.redirect.loginWithCredentials({
                connection: 'Username-Password-Authentication',
                username: username,
                password: password,
            }, function (err) {
                if (err) {
                    return alert(err.description);
                }
            });
        }

        function signup(username, password) {
            angularAuth0.redirect.signupAndLogin({
                connection: 'Username-Password-Authentication',
                email: username,
                password: password
            }, function (err) {
                if (err) return alert(err.description);
            });
        }

        function loginWithGoogle() {
            angularAuth0.authorize({
                connection: 'google-oauth2'
            });
        }

        function handleParseHash() {
            angularAuth0.parseHash({
                    _idTokenVerification: false
                },
                function (err, authResult) {
                    if (err) {
                        console.log(err);
                    }
                    if (authResult && authResult.idToken) {
                        angularAuth0.client.userInfo(authResult.accessToken, function (err, user) {
                            // Now you have the user's information
                            if (err) {
                                console.log(err);
                            } else {
                                localStorage.setItem('userInfo', JSON.stringify(user));
                            }
                        });
                        setUser(authResult);
                    }
                });
        }

        function logout() {
            localStorage.removeItem('access_token');
            localStorage.removeItem('id_token');
            localStorage.removeItem('userInfo');
            $state.go('home');
        }

        function setUser(authResult) {
            console.log(authResult);
            localStorage.setItem('access_token', authResult.accessToken);
            localStorage.setItem('id_token', authResult.idToken);
        }

        function isAuthenticated() {
            return authManager.isAuthenticated();
        }

        return {
            login: login,
            signup: signup,
            loginWithGoogle: loginWithGoogle,
            handleParseHash: handleParseHash,
            logout: logout,
            isAuthenticated: isAuthenticated
        }

    });