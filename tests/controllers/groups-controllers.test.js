'use strict';

var request = require('request');
var server = require('../../src/index');
var config = require('../../src/config/config');

var chai = require('chai'),
    expect = chai.expect;

var port = process.env.PORT || config.port;

process.env.NODE_ENV = "test";

var authString = "?apikey=jDerK=e3dasE";

describe('Groups Controllers Tests', function () {

    before(function (done) {
        server.deploy(function (err) {
            if (err) {

                done(err);
            } else {
                request.post({
                    url: 'http://localhost:' + port + '/api/v1/groups' + authString,
                    json: true,
                    body: {
                        name: "ISA-tests1"
                    }
                }, function (err, res) {
                    if (err) {
                        done(err);
                    } else if (res.statusCode != 201) {
                        done(new Error("Status Code not equal 201"));
                    } else {
                        request.post({
                            url: 'http://localhost:' + port + '/api/v1/groups' + authString,
                            json: true,
                            body: {
                                name: "ISA-tests2"
                            }
                        }, function (err, res) {
                            if (err) {
                                done(err);
                            } else if (res.statusCode != 201) {
                                done(new Error("Status Code not equal 201"));
                            } else {
                                request.post({
                                    url: 'http://localhost:' + port + '/api/v1/groups' + authString,
                                    json: true,
                                    body: {
                                        name: "ISA-tests3"
                                    }
                                }, function (err, res) {
                                    if (err) {
                                        done(err);
                                    } else if (res.statusCode != 201) {
                                        done(new Error("Status Code not equal 201"));
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
            url: 'http://localhost:' + port + '/api/v1/groups' + authString,
            json: true,
            body: {
                name: "ISA-tests"
            }
        }, function (err, res) {
            if (err) {
                done(err);
            } else if (res.statusCode != 201) {
                done(new Error("Status Code not equal 201"));
            } else {
                expect(res.statusCode).to.equal(201);
                done();
            }
        });
    });

    it('GET ALL /groups', function (done) {
        request.get({
            url: 'http://localhost:' + port + '/api/v1/groups' + authString,
            json: true,

        }, function (err, res, body) {
            if (err) {
                done(err);
            } else if (res.statusCode != 200) {
                done(new Error("Status Code not equal 200"));
            } else {
                expect(body.length).to.equal(4);
                done();
            }
        });
    });


    it('UPDATE /groups', function (done) {
        request.put({
            url: 'http://localhost:' + port + '/api/v1/groups/ISA-tests' + authString,
            json: true,
            body: {
                name: "ISAUpdate-tests"
            }
        }, function (err, res) {
            if (err) {
                done(err);
            } else if (res.statusCode != 200) {
                done(new Error("Status Code not equal 200"));
            } else {
                expect(res.statusCode).to.equal(200);
                done();
            }
        });
    });


    it('GET /groups/ISAUpdate-tests', function (done) {
        request.get({
            url: 'http://localhost:' + port + '/api/v1/groups/ISAUpdate-tests' + authString,
            json: true,
        }, function (err, res, body) {
            if (err) {
                done(err);
            } else if (res.statusCode != 200) {
                done(new Error("Status Code not equal 200"));
            } else {
                expect(body.name).to.equal("ISAUpdate-tests");
                done();
            }
        });
    });


    it('DELETE /groups/ISAUpdate-tests', function (done) {
        request.delete({
            url: 'http://localhost:' + port + '/api/v1/groups/ISAUpdate-tests' + authString,
            json: true
        }, function (err, res) {
            if (err) {
                done(err);
            } else if (res.statusCode != 200) {
                done(new Error("Status Code not equal 200"));
            } else {
                expect(res.statusCode).to.equal(200);
                done();
            }
        });
    });

    it('GET /groups/ISAUpdate-tests NOT FOUND', function (done) {
        request.get({
            url: 'http://localhost:' + port + '/api/v1/groups/ISAUpdate-tests' + authString,
            json: true,
        }, function (err, res) {
            if (err) {
                done(err);
            } else if (res.statusCode != 404) {
                done(new Error("Status Code not equal 404"));
            } else {
                expect(res.statusCode).to.equal(404);
                done();
            }
        });
    });

    it('DELETE ALL /groups', function (done) {
        request.delete({
            url: 'http://localhost:' + port + '/api/v1/groups' + authString,
            json: true
        }, function (err, res) {
            if (err) {
                done(err);
            } else if (res.statusCode != 200) {
                done(new Error("Status Code not equal 200"));
            } else {
                expect(res.statusCode).to.equal(200);
                done();
            }
        });
    });

    it('GET ALL /groups', function (done) {
        request.get({
            url: 'http://localhost:' + port + '/api/v1/groups' + authString,
            json: true,

        }, function (err, res, body) {
            if (err) {
                done(err);
            } else if (res.statusCode != 200) {
                done(new Error("Status Code not equal 200"));
            } else {
                expect(body.length).to.equal(0);
                done();
            }
        });
    });

    it('NOT authenticated request', function (done) {
        request.get({
            url: 'http://localhost:' + port + '/api/v1/groups',
            json: true,

        }, function (err, res, body) {
            if (err) {
                done(err);
            } else {
                expect(res.statusCode).to.equal(401);

                expect(body.code).to.equal(401);
                expect(body.message).to.equal("UNAUTHORIZED");
                done();
            }
        });
    });

});
