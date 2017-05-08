'use strict';

const APIKEY = "jDerK=e3dasE";

var Errors = require('../controllers/error');

module.exports = {
    authmiddelware: _authmiddelware
};

function _authmiddelware(req, res, next) {
    var reqApikey = req.query.apikey;

    if (reqApikey === APIKEY || req.query.clientId) {
        next();
    } else {
        res.status(401).json(new Errors.error401());
    }

}