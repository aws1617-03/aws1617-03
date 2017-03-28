'use strict';

var Groups = require('../database/database').Groups;

var GroupsControllers = function () { };


GroupsControllers.prototype.getAll = function (req, res) {
    Groups.find({}, function (err, groups) {
        if (err) {
            res.status(500).json(); //standarize errors.
        } else {
            res.json(groups);
        }
    });
};

GroupsControllers.prototype.create = function (req, res) {

    if (req.body) {
        var newGroups = new Groups(req.body);
        newGroups.save(function (err) {
            if (err) {
                res.status(500).json(); //standarize errors.
            } else {
                res.json();
            }
        });
    } else {
        res.status(400).json(); //standarize errors
    }

};

GroupsControllers.prototype.deleteAll = function (req, res) {
    Groups.deleteAll(function (err) {
        if (err) {
            res.status(500).json(); //standarize errors.
        } else {
            res.json();
        }
    });
};

GroupsControllers.prototype.getOneByName = function (req, res) {
    var name = req.params.name;
    if (!name) {
        res.status(400).json();  //standarize errors.
    } else {
        Groups.findOne({ name: name }, function (err, group) {
            if (err) {
                res.status(500).json(); //standarize errors.
            } else {
                if (!group) {
                    res.status(404).json();  //standarize errors.
                } else {
                    res.json(group);
                }
            }
        });
    }
};

GroupsControllers.prototype.deleteOne = function (req, res) {
    var name = req.params.name;
    if (!name) {
        res.status(400).json();  //standarize errors.
    } else {
        Groups.deleteOne({ name: name }, function (err) {
            if (err) {
                res.status(500).json(); //standarize errors.
            } else {
                res.json();
            }
        });
    }
};

GroupsControllers.prototype.update = function (req, res) {
    var updateGroup = req.body;
    var name = req.params.name;
    if (!updateGroup || !name) {
        res.status(400).json();  //standarize errors.
    } else {
        Groups.update({ name: name }, updateGroup, function (err) {
            if (err) {
                res.status(500).json(); //standarize errors.
            } else {
                res.json();
            }
        });
    }
};

module.exports = new GroupsControllers();