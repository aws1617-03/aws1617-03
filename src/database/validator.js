'use strict';

var ajv = new require('ajv')();

module.exports = {
    validateGroups: _validateGroups
};

function _validateGroups(groups) {
    var groupSchema = require('./groups-schema.json');
    var valid = false;

    valid = ajv.validate(groupSchema, groups);

    return {
        valid: valid,
        errors: ajv.errors
    };

}