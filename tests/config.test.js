'use strict';

var expect = require('chai').expect;
process.env.NODE_ENV = "test";

describe('Config module tests', function () {
    var config = require('../src/config/config');

    it('exports addConfiguration', function () {
        expect(config.addConfiguration instanceof Function);
    });

    it('add configuration', function () {
        config.addConfiguration('tests/sources/test-configuration.json');

        expect(config.port).to.be.equal(3000);
        expect(config.api.basePath).to.be.equal("/api/v1");
        expect(config.database.host).to.be.equal("192.168.99.100");
        expect(config.database.port).to.be.equal("27017");
        expect(config.database.name).to.be.equal("groups_db");
        expect(config.database.collections[0].name).to.be.equal("groups");
        expect(config.database.collections[0].schema).to.be.equal("./groups-schema.json");
    });
});