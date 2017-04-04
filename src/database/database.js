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

    var auth = config.database.auth;

    var username = process.env[config.database.username];
    var password = process.env[config.database.password];

    var url = 'mongodb://' + host + ':' + port + '/' + name;
    var opt;
    if (auth && username && password) {
        opt = {
            user: username,
            pass: password
        };
    } else {
        return callback(new Error("If auth = true, then username and password are required"));
    }

    mongoose.connect(url, opt, function (err) {
        if (!err) {
            return callback();
        } else {
            return callback(err);
        }
    });
}