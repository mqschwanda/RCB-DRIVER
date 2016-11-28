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

  // PLAY
  router.get('/play', function (req, res) {
  	var hbsObject = {active: {liveMap: true}};
  	res.render('liveMap', hbsObject);
  });

  // LIVE MAP
  router.get('/live_map', function (req, res) {
  	var hbsObject = {active: {liveMap: true}};
  	res.render('liveMap', hbsObject);
  });

  // CONTROLS
  router.get('/controls', function (req, res) {
  	var hbsObject = {active: {controls: true}};
  	res.render('controls', hbsObject);
  });

  // ABOUT
  router.get('/about', function (req, res) {
  	var hbsObject = {active: {about: true}};
  	res.render('about', hbsObject);
  });

  // SETTINGS
  router.get('/settings', function (req, res) {
    var hbsObject = {active: {settings: true}};
    res.render('settings', hbsObject);
  });

};
