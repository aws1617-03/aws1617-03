'use strict';

var auth = require('../../src/auth/auth');
var request = require('request');
var server = require('../../src/index');
var config = require('../../src/config/config');

var chai = require('chai'),
    expect = chai.expect;

var port = process.env.PORT || config.port;

//Options to get authorizations codes.
var authOptions = {
    method: 'POST',
    url: 'https://dani8art.eu.auth0.com/oauth/token',
    headers: {
        'content-type': 'application/json'
    },
    body: {
        grant_type: 'client_credentials',
        client_id: 'rjo6JzVVkA4r6mLIBRBOQ2wLrqTYtBAf',
        client_secret: process.env.CLIENT_SECRET,
        audience: "https://aws1617-03.herokuapp.com"
    },
    json: true
};


process.env.NODE_ENV = "test";

var authString;

describe('Groups Controllers Tests', function () {

    before(function (done) {
        this.timeout(10000);
        request(authOptions, function (error, response, body) {
            if (error) {
                done(new Error(error));
            } else {
                if (!body.error) {
                    authString = "Bearer " + body.access_token;
                    server.deploy(function (err) {
                        if (err) {

                            done(err);
                        } else {
                            request.post({
                                url: 'http://localhost:' + port + '/api/v1/groups',
                                json: true,
                                body: {
                                    name: "ISA-tests1"
                                },
                                headers: {
                                    Authorization: authString
                                }
                            }, function (err, res, body) {
                                if (err) {
                                    done(err);
                                } else if (res.statusCode != 201) {
                                    console.log(res.statusCode);
                                    console.log(body);
                                    done(new Error("Status Code not equal 201"));
                                } else {
                                    request.post({
                                        url: 'http://localhost:' + port + '/api/v1/groups',
                                        json: true,
                                        body: {
                                            name: "ISA-tests2"
                                        },
                                        headers: {
                                            Authorization: authString
                                        }
                                    }, function (err, res) {
                                        if (err) {
                                            done(err);
                                        } else if (res.statusCode != 201) {
                                            done(new Error("Status Code not equal 201"));
                                        } else {
                                            request.post({
                                                url: 'http://localhost:' + port + '/api/v1/groups',
                                                json: true,
                                                body: {
                                                    name: "ISA-tests3"
                                                },
                                                headers: {
                                                    Authorization: authString
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
                } else {
                    done(new Error(JSON.stringify(body, null, 2)));
                }
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
            },
            headers: {
                Authorization: authString
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
            url: 'http://localhost:' + port + '/api/v1/groups',
            json: true,
            headers: {
                Authorization: authString
            }

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
            url: 'http://localhost:' + port + '/api/v1/groups/ISA-tests',
            json: true,
            body: {
                name: "ISAUpdate-tests"
            },
            headers: {
                Authorization: authString
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
            url: 'http://localhost:' + port + '/api/v1/groups/ISAUpdate-tests',
            json: true,
            headers: {
                Authorization: authString
            }
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
            url: 'http://localhost:' + port + '/api/v1/groups/ISAUpdate-tests',
            json: true,
            headers: {
                Authorization: authString
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

    it('GET /groups/ISAUpdate-tests NOT FOUND', function (done) {
        request.get({
            url: 'http://localhost:' + port + '/api/v1/groups/ISAUpdate-tests',
            json: true,
            headers: {
                Authorization: authString
            }
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
            url: 'http://localhost:' + port + '/api/v1/groups',
            json: true,
            headers: {
                Authorization: authString
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

    it('GET ALL /groups', function (done) {
        request.get({
            url: 'http://localhost:' + port + '/api/v1/groups',
            json: true,
            headers: {
                Authorization: authString
            }

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
            json: true
        }, function (err, res, body) {
            if (err) {
                done(err);
            } else {
                expect(res.statusCode).to.equal(401);
                done();
            }
        });
    });

});