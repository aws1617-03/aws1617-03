'use strict';

var Errors = function () { };

Errors.prototype.error500 = function () {
    this.code = 500;
    this.message = "INTERNAL SERVER ERROR";
};

Errors.prototype.error400 = function (reason) {
    this.code = 400;
    this.message = "BAD REQUEST";
    if (reason) {
        this.reason = reason;
    }
};

Errors.prototype.error404 = function () {
    this.code = 404;
    this.message = "NOT FOUND";
};

module.exports = new Errors();



