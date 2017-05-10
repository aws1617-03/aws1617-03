'use strict';

var jwt = require('express-jwt'),
    jwksRsa = require('jwks-rsa');

var _authmiddelware = jwt({
    // Dynamically provide a signing key
    // based on the kid in the header and 
    // the singing keys provided by the JWKS endpoint.
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://dani8art.eu.auth0.com/.well-known/jwks.json'
    }),

    // Validate the audience and the issuer.
    audience: 'https://aws1617-03.herokuapp.com',
    issuer: 'https://dani8art.eu.auth0.com/',
    algorithms: ['RS256']
});

module.exports = {
    authmiddelware: _authmiddelware
};