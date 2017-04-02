'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

mongoose.Promise = require('bluebird');

var config = require('../config/config'),
    fs = require('fs'),
    jsyaml = require('js-yaml');

var groupsSchemaYaml = fs.readFileSync(__dirname + '/groups-schema.json', 'utf8');

module.exports = {
    connect: _connect,
    Groups: mongoose.model('Groups', new Schema(jsyaml.safeLoad(groupsSchemaYaml).properties))
};

function _connect(callback) {
    var host = config.database.host;
    var port = config.database.port;
    var name = config.database.name;

    mongoose.connect('mongodb://' + host + ':' + port + '/' + name, function (err) {
        if (!err) {
            callback();
        } else {
            callback(err);
        }
    });
}