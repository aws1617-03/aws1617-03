'use strict';

var Errors = require('./error');

const CLIENT_ID = "84829f0084de9729788e23f5cc468408811f57d6";

var TokensControllers = function () { };


TokensControllers.prototype.getGitHub = function (req, res) {
    var clientId = req.query.clientId;

    if (CLIENT_ID === clientId) {
        res.json(process.env.GITHUB_TOKEN || "aws1617-03");
    } else {
        res.status(401).json(new Errors.error401());
    }
};

module.exports = new TokensControllers();