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
  	var hbsObject = {active: {gameMap: true, play: true}};
  	res.render('gameMap', hbsObject);
  });
  // WATCH
  router.get('/watch', function (req, res) {
  	var hbsObject = {active: {gameMap: true, watch: true}};
  	res.render('gameMap', hbsObject);
  });

};
