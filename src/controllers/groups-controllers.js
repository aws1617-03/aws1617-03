'use strict';

var Groups = require('../database/database').Groups;
var Errors = require('./error');
var validateGroups = require('../database/validator').validateGroups;

var GroupsControllers = function () { };


GroupsControllers.prototype.getAll = function (req, res) {
    var page = req.query.page;
    var limit = parseInt(req.query.limit <= 10 ? req.query.limit : 10);

    var query = Groups.find({}, function (err, groups) {
        if (err) {
            res.status(500).json(new Errors.error500());
        } else {
            res.json(groups);
        }
    });

    if (page) {
        query.skip((page - 1) * limit).limit(limit);
    }
};

GroupsControllers.prototype.create = function (req, res) {
    var isValid = validateGroups(req.body);

    if (req.body && isValid.valid) {
        var newGroups = new Groups(req.body);
        newGroups.save(function (err, group) {
            if (err) {
                res.status(409).json(new Errors.error409());
            } else {
                res.status(201).json({ "_id": group._id });
            }
        });
    } else {
        res.status(400).json(new Errors.error400(isValid.errors));
    }

};

GroupsControllers.prototype.deleteAll = function (req, res) {
    Groups.remove({}, function (err) {
        if (err) {
            res.status(500).json(new Errors.error500());
        } else {
            res.json();
        }
    });
};

GroupsControllers.prototype.getOneById = function (req, res) {
    var id = req.params.id;
    if (!id) {
        res.status(400).json(new Errors.error400());
    } else {
        Groups.findOne({ _id: id }, function (err, group) {
            if (err) {
                res.status(500).json(new Errors.error500());
            } else {
                if (!group) {
                    res.status(404).json(new Errors.error404());
                } else {
                    res.json(group);
                }
            }
        });
    }
};

GroupsControllers.prototype.deleteOne = function (req, res) {
    var id = req.params.id;
    if (!id) {
        res.status(400).json(new Errors.error400());
    } else {
        Groups.remove({ _id: id }, function (err) {
            if (err) {
                res.status(500).json(new Errors.error500());
            } else {
                res.json();
            }
        });
    }
};

GroupsControllers.prototype.update = function (req, res) {
    var updateGroup = req.body;
    var id = req.params.id;
    if (!updateGroup || !id) {
        res.status(400).json(Errors.error400);
    } else {
        Groups.update({ _id: id }, updateGroup, function (err) {
            if (err) {
                res.status(500).json(Errors.error500);
            } else {
                res.json();
            }
        });
    }
};

module.exports = new GroupsControllers();