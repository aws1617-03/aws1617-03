'use strict';

var request = require('request');
var server = require('../../src/index');

process.env.NODE_ENV = "test";

describe('Groups Controllers Tests', function () {

    before(function (done) {
        server.deploy(done);
    });

    after(function (done) {
        server.undeploy(done);
    });

    it('POST /groups', function (done) {
        request.post({
            url: 'http://localhost:3000/api/v1/groups',
            json: true,
            body: {
                name: "ISA-tests"
            }
        }, function (err, res) {
            if (err || res.statusCode != 200) {
                done(err);
            } else {
                done();
            }
        });
    });

});
