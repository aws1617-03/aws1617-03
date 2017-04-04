'use strict';

var server = require('./src/index');

server.deploy(function (err) {
    if (err) {
        console.log(err);
    }
});