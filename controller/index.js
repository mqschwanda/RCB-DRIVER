var express = require('express');
var router = express.Router();

// API ROUTES WITH MAPBOX
require('./mapbox.js')(router);

// API ROUTES FOR USER CREATION
require('./user.js')(router);

// HTML SERVER
require('./html.js')(router);


// EXPORT
module.exports = router;
