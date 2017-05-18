'use strict';

var jwt = require('express-jwt'),
    jsonwebtoken = require('jsonwebtoken'),
    jwksRsa = require('jwks-rsa');

var _authmiddelware = jwt({

    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://dani8art.eu.auth0.com/.well-known/jwks.json'
    }),
    // secret: "fsQcE35Cop5VilZMCl12G8ZxjfQVxt5J1nAJFBgffbmJaAlpSDa5JEmCtGp0cBP_",
    algorithms: ['RS256']
});

module.exports = {
    authmiddelware: _authmiddelware
};