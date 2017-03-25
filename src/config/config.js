'use strict';

var jsyaml = require('js-yaml');
var fs = require('fs');

module.exports = {
    addConfiguration: _addConfiguration
};

function _addConfiguration(file) {
    console.log('Add configuration from %s', file);
    try {

        var newConfig = jsyaml.safeLoad(fs.readFileSync(file))[process.env.NODE_ENV || 'development'];

        for (var c in newConfig) {
            module.exports[c] = newConfig[c];
        }
        console.log('Configuration has been added');

    } catch (e) {
        throw new Error('Error adding configuration ' + e.toString());
    }
}