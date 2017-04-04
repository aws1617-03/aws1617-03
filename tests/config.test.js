'use strict';

var expect = require('chai').expect;
process.env.NODE_ENV = "test";

describe('Config module tests', function () {
    var config = require('../src/config/config');

    it('exports addConfiguration', function () {
        expect(config.addConfiguration instanceof Function);
    });

    it('add configuration', function () {
        config.addConfiguration('tests/sources/test-configuration.yaml');

        expect(config.port).to.be.equal(3000);
        expect(config.api.basePath).to.be.equal("/api/v1");
        expect(config.database.host).to.be.equal("ds149800.mlab.com");
        expect(config.database.port).to.be.equal("49800");
        expect(config.database.name).to.be.equal("tests_groups_db");
        expect(config.database.auth).to.be.equal(true);
        expect(config.database.username).to.be.equal("MONGO_USER");
        expect(config.database.password).to.be.equal("MONGO_PASS");
        expect(config.database.collections[0].name).to.be.equal("groups");
        expect(config.database.collections[0].schema).to.be.equal("./groups-schema.json");
    });
});