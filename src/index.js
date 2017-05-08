'use strict';

var path = {};
path.join = require('url-join');

//Require dependencies
var express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    config = require('./config/config'),
    database = require('./database/database');

//add configuration
config.addConfiguration(path.join(__dirname, '/../app-configuration.yaml'));

//Require controllers
var groupsControllers = require('./controllers/groups-controllers'),
    tokensControllers = require('./controllers/tokens-controllers'),
    auth = require('./auth/auth');

//create express app
var app = express();
//add utilities middelwares
app.use(bodyParser.json());
app.use(cors());

/******************
 * PUBLIC FILES
 ******************/

app.use('/', express.static('./public'));

/*****************************
 *  API ENDPOINT DEFINITIONS
 *****************************/
var apiBase = config.api.basePath;

app.use('/api', auth.authmiddelware);

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
 * 
 *  query params: []
 */
app.get(path.join(apiBase, 'groups/:name'), groupsControllers.getOneByName);

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
app.put(path.join(apiBase, 'groups/:name'), groupsControllers.update);

/**
 *  DELETE ../groups
 */
app.delete(path.join(apiBase, 'groups'), groupsControllers.deleteAll);

/**
 *  DELETE ../groups/:id
 * 
 */
app.delete(path.join(apiBase, 'groups/:name'), groupsControllers.deleteOne);


/**
 *  GET ../tokens/github
 *  
 *  query params:
 *    - clientId
 */
app.get(path.join(apiBase, 'tokens/github'), tokensControllers.getGitHub);

//START APP
var port = process.env.PORT || config.port;

var server;
module.exports.deploy = function (callback) {
    database.connect(function (err) {
        if (!err) {
            server = app.listen(port, function (exErr) {
                if (exErr) {
                    console.log('Error with express ' + exErr.toString());
                } else {
                    console.log('Groups API is running on http://localhost:%s' + apiBase, port);
                    console.log('Groups UI is running on http://localhost:%s', port);
                    callback();
                }
            });
        } else {
            console.log('Error with database connection ' + err.toString());
            callback(err);
        }
    });
};

module.exports.undeploy = function (callback) {
    server.close(callback);
};
