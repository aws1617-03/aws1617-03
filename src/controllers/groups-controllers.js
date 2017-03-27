'use strict';

var MongoClient = require('mongodb').MongoClient;
var db;


var groupsControllers = function () {};

groupsControllers.prototype.connectDb = function(callback) {
    MongoClient.connect(process.env.MONGODB_URL, function(err, database) {
        if(err){
            callback(err);
        }
        
        db = database.collection('groups');
        
        callback(err, database);
    });
};

groupsControllers.prototype.getAll = function(callback) {
    return db.find({}).toArray(callback);
};

groupsControllers.prototype.create = function(contact, callback) {
    return db.insert(contact, callback);
};

groupsControllers.prototype.deleteAll = function(callback) {
    return db.remove({},{ multi: true},callback);
};

groupsControllers.prototype.getOneByName = function(name, callback) {
    return db.find({name:name}).toArray(callback);
};

groupsControllers.prototype.deleteOne = function(name, callback) {
    return db.remove({name:name},{ multi: true}, callback);
};

groupsControllers.prototype.update = function(name, updatedContact, callback) {
    return db.update({name:name},updatedContact,{}, callback);
};

module.exports = new groupsControllers();