'use strict';

//Require dependencies
var express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    path = require('path'),
    config = require('./src/config/config');

//add configuration
config.addConfiguration(path.join(__dirname, 'app-configuration.yaml'));

//Require controllers
var groupsControllers = require('./src/controllers/groups-controllers');

//create express app
var app = express();
//add utilities middelwares
app.use(bodyParser.json());
app.use(cors());

/*****************************
 *  API ENDPOINT DEFINITIONS
 *****************************/
var apiBase = config.api.basePath;

/**
 *  GET ../groups
 *  
 *  query params:
 *    - search
 *    - limit
 *    - page
 */
app.get(path.join(apiBase, 'groups'), groupsControllers.getAll);

/**
 *  GET ../groups/:id
 * 
 *  query params: []
 */
app.get(path.join(apiBase, 'groups/:id'), groupsControllers.getOneByName);

/**
 *  POST ../groups
 * 
 *  body: {
 *     "name": "ISA",
 *     "description": "Applied Software Engineering",
 *     "members": ["Pablo F.", "Antonio R."]
 *  }
 */
app.post(path.join(apiBase, 'groups'), groupsControllers.create);

/**
 *  PUT ../groups/:id
 *  
 *  body: {
 *     "name": "ISA",
 *     "description": "Applied Software Engineering",
 *     "members": ["Pablo F.", "Antonio R."]
 *  }
 */
app.put(path.join(apiBase, 'groups/:id'), groupsControllers.update);

/**
 *  DELETE ../groups
 */
app.delete(path.join(apiBase, 'groups'), groupsControllers.deleteAll);

/**
 *  DELETE ../groups/:id
 * 
 */
app.delete(path.join(apiBase, 'groups/:id'), groupsControllers.deleteOne);

//START APP
var port = process.env.PORT || config.port;
app.listen(port, function () {
    console.log('Groups API is running on http://localhost:%s' + apiBase, port);
});