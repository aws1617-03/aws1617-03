'use strict';

var jwt = require('express-jwt'),
    jsonwebtoken = require('jsonwebtoken'),
    jwksRsa = require('jwks-rsa');

var _authmiddelware = jwt({
    secret: "fsQcE35Cop5VilZMCl12G8ZxjfQVxt5J1nAJFBgffbmJaAlpSDa5JEmCtGp0cBP_"
});

module.exports = {
    authmiddelware: _authmiddelware
};