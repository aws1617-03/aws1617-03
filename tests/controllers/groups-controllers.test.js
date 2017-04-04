'use strict';

var request = require('request');
var server = require('../../src/index');
var port = process.env.PORT || 3000;

process.env.NODE_ENV = "test";


describe('Groups Controllers Tests', function () {

    before(function (done) {
        server.deploy(function (err){
            if (err) {
                done(err);
            } else {
                request.post({
                        url: 'http://localhost:'+port+'/api/v1/groups',
                        json: true,
                        body: {
                            name: "ISA-tests1"
                        }
                }, function (err, res) {
                        if (err || res.statusCode != 201) {
                            done(err);
                        } else {
                            request.post({
                                url: 'http://localhost:'+port+'/api/v1/groups',
                                json: true,
                                body: {
                                    name: "ISA-tests2"
                                }
                            }, function (err, res) {
                                if (err || res.statusCode != 201) {
                                    done(err);
                                } else {
                                    request.post({
                                        url: 'http://localhost:'+port+'/api/v1/groups',
                                        json: true,
                                        body: {
                                            name: "ISA-tests3"
                                        }
                                    }, function (err, res) {
                                        if (err || res.statusCode != 201) {
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
            url: 'http://localhost:'+port+'/api/v1/groups',
            json: true,
            body: {
                name: "ISA-tests"
            }
        }, function (err, res) {
            if (err || res.statusCode != 201) {
                done(err);
            } else {
                done();
            }
        });
    });
    
    it('GET ALL /groups', function (done) {
        request.get({
            url: 'http://localhost:'+port+'/api/v1/groups/',
            json: true,

        }, function (err, res) {
            if (err || res.statusCode != 200) {
                done(err);
            } else {
                done();
            }
        });
    });
    
    
    it('UPDATE /groups', function (done) {
        request.put({
            url: 'http://localhost:'+port+'/api/v1/groups/ISA-tests',
            json: true,
            body: {
                name: "ISAUpdate-tests"
            }
        }, function (err, res) {
            if (err || res.statusCode != 200) {
                done(err);
            } else {
                done();
            }
        });
    });
    

    it('GET /groups', function (done) {
        request.get({
            url: 'http://localhost:'+port+'/api/v1/groups/ISAUpdate-tests',
            json: true,
        }, function (err, res) {
            if (err || res.statusCode != 200) {
                done(err);
            } else {
                done();
            }
        });
    });
    
    
     it('DELETE /groups', function (done) {
        request.delete({
            url: 'http://localhost:'+port+'/api/v1/groups/ISAUpdate-tests',
            json: true,
            body: {
              
            }
        }, function (err, res) {
            if (err || res.statusCode != 200) {
                done(err);
            } else {
                done();
            }
        });
    });
    
    it('GET ALL /groups', function (done) {
        request.get({
            url: 'http://localhost:'+port+'/api/v1/groups/',
            json: true,

        }, function (err, res) {
            if (err || res.statusCode != 200) {
                done(err);
            } else {
                done();
            }
        });
    });
    
    it('DELETE ALL /groups', function (done) {
        request.delete({
            url: 'http://localhost:'+port+'/api/v1/groups/ISAUpdate-tests',
            json: true,
            body: {
              
            }
        }, function (err, res) {
            if (err || res.statusCode != 200) {
                done(err);
            } else {
                done();
            }
        });
    });
    
    it('GET ALL /groups', function (done) {
        request.get({
            url: 'http://localhost:'+port+'/api/v1/groups/',
            json: true,

        }, function (err, res) {
            if (err || res.statusCode != 200) {
                done(err);
            } else {
                done();
            }
        });
    });
    

});
