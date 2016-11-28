// EXPRESS CONFIGURATION
var express = require('express');
var server = express();
var PORT = process.env.PORT || 8080;

// HANDLEBARS CONFIGURATION
var exphbs = require('express-handlebars');
server.engine('.hbs', exphbs({
  extname: '.hbs',
  layoutsDir: 'views/layouts/',
  partialsDir: 'views/partials/',
  defaultLayout : 'main'
}));
server.set('view engine', '.hbs');
server.set('views', 'views')

// METHOD OVERRIDE
var methodOverride = require('method-override');
server.use(methodOverride('_method'));

// BODY PARSER
var bodyParser = require('body-parser');
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.text());
server.use(bodyParser.json({type:'application/vnd.api+json'}));
server.use(express.static(process.cwd() + '/public'));

// ROUTER
var routes = require('./controller/index.js');
server.use('/', routes);

// LISTENER
server.listen(PORT, function() {
	console.log("App listening on PORT: " + PORT);
});
