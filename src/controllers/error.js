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

Errors.prototype.error409 = function (reason) {
    this.code = 409;
    this.message = "CONFLICT";
    if (reason) {
        this.reason = reason;
    }
};

module.exports = new Errors();



