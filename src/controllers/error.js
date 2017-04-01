'use strict';

var errors = function () {};

errors.prototype.error500 = function() {
    errors.code = 500;
    errors.message = "INTERNAL SERVER ERROR";
};
   
errors.prototype.error400 = function() {
    errors.code = 400;
    errors.message = "BAD REQUEST";
};

errors.prototype.error404 = function() {
    errors.code = 404;
    errors.message = "NOT FOUND";
};

module.exports = new errors();



