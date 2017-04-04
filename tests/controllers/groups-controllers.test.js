'use strict';

var request = require('request');
var server = require('../../src/index');
var config = require('../../src/config/config');

var chai = require('chai'),
    expect = chai.expect;

var port = process.env.PORT || config.port;

process.env.NODE_ENV = "test";


describe('Groups Controllers Tests', function () {

    before(function (done) {
        server.deploy(function (err) {
            if (err) {

                done(err);
            } else {
                request.post({
                    url: 'http://localhost:' + port + '/api/v1/groups',
                    json: true,
                    body: {
                        name: "ISA-tests1"
                    }
                }, function (err) {
                    if (err) {

                        done(err);
                    } else {
                        request.post({
                            url: 'http://localhost:' + port + '/api/v1/groups',
                            json: true,
                            body: {
                                name: "ISA-tests2"
                            }
                        }, function (err) {
                            if (err) {

                                done(err);
                            } else {
                                request.post({
                                    url: 'http://localhost:' + port + '/api/v1/groups',
                                    json: true,
                                    body: {
                                        name: "ISA-tests3"
                                    }
                                }, function (err) {
                                    if (err) {

                                        done(err);
                                    } else {
                                        done();
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    });



    after(function (done) {
        server.undeploy(done);
    });

    it('POST /groups', function (done) {
        request.post({
            url: 'http://localhost:' + port + '/api/v1/groups',
            json: true,
            body: {
                name: "ISA-tests"
            }
        }, function (err, res) {
            if (err) {

                done(err);
            } else {
                expect(res.statusCode).to.equal(200);
                done();
            }
        });
    });

    it('GET ALL /groups', function (done) {
        request.get({
            url: 'http://localhost:' + port + '/api/v1/groups',
            json: true,

        }, function (err, res, body) {
            if (err || res.statusCode != 200) {

                done(err);
            } else {
                expect(body.length).to.equal(4);
                done();
            }
        });
    });


    it('UPDATE /groups', function (done) {
        request.put({
            url: 'http://localhost:' + port + '/api/v1/groups/ISA-tests',
            json: true,
            body: {
                name: "ISAUpdate-tests"
            }
        }, function (err, res) {
            if (err || res.statusCode != 200) {

                done(err);
            } else {
                expect(res.statusCode).to.equal(200);
                done();
            }
        });
    });


    it('GET /groups/ISAUpdate-tests', function (done) {
        request.get({
            url: 'http://localhost:' + port + '/api/v1/groups/ISAUpdate-tests',
            json: true,
        }, function (err, res, body) {
            if (err || res.statusCode != 200) {

                done(err);
            } else {
                expect(body.name).to.equal("ISAUpdate-tests");
                done();
            }
        });
    });


    it('DELETE /groups/ISAUpdate-tests', function (done) {
        request.delete({
            url: 'http://localhost:' + port + '/api/v1/groups/ISAUpdate-tests',
            json: true
        }, function (err, res) {
            if (err || res.statusCode != 200) {
                done(err);
            } else {
                expect(res.statusCode).to.equal(200);
                done();
            }
        });
    });

    it('GET /groups/ISAUpdate-tests NOT FOUND', function (done) {
        request.get({
            url: 'http://localhost:' + port + '/api/v1/groups/ISAUpdate-tests',
            json: true,
        }, function (err, res) {
            if (err) {
                done(err);
            } else {
                expect(res.statusCode).to.equal(404);
                done();
            }
        });
    });

    it('DELETE ALL /groups', function (done) {
        request.delete({
            url: 'http://localhost:' + port + '/api/v1/groups',
            json: true
        }, function (err, res) {
            if (err || res.statusCode != 200) {

                done(err);
            } else {
                expect(res.statusCode).to.equal(200);
                done();
            }
        });
    });

    it('GET ALL /groups', function (done) {
        request.get({
            url: 'http://localhost:' + port + '/api/v1/groups',
            json: true,

        }, function (err, res, body) {
            if (err || res.statusCode != 200) {

                done(err);
            } else {
                expect(body.length).to.equal(0);
                done();
            }
        });
    });


});
