'use strict';

var Errors = function () { };

Errors.prototype.error500 = function () {
    Errors.code = 500;
    Errors.message = "INTERNAL SERVER ERROR";
};

Errors.prototype.error400 = function () {
    Errors.code = 400;
    Errors.message = "BAD REQUEST";
};

Errors.prototype.error404 = function () {
    Errors.code = 404;
    Errors.message = "NOT FOUND";
};

module.exports = new Errors();



