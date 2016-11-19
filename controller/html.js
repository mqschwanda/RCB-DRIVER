module.exports = function (router) {

  // HOME PAGE set as default
  router.get('/', function (req, res) {
  	res.redirect('/home');
  });

  // HOME
  router.get('/home', function (req, res) {
  	var hbsObject = {active: {home: true}};
  	res.render('home', hbsObject);
  });

  // LIVE MAP
  router.get('/live_map', function (req, res) {
  	var hbsObject = {active: {liveMap: true}};
  	res.render('liveMap', hbsObject);
  });

  // ALERTS
  router.get('/alerts', function (req, res) {
  	var hbsObject = {active: {alerts: true}};
  	res.render('alerts', hbsObject);
  });

  // ABOUT
  router.get('/about', function (req, res) {
  	var hbsObject = {active: {about: true}};
  	res.render('about', hbsObject);
  });

  // LOGIN
  router.get('/login', function (req, res) {
  	var hbsObject = {active: {login: true}};
  	res.render('login', hbsObject);
  });

};
