var express = require('express');
var router = express.Router();

// API ROUTES WITH MAPBOX
require('./map.js')(router);

// HTML SERVER
require('./html.js')(router);

// EXPORT
module.exports = router;
