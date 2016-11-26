module.exports = function (router) {

  router.post('/post/player', function (req, res) {
    // store information from client new username post
    var data = req.body;
    var playerName = data.name;

    // insert 'player.name 'into mySQL database and return primary key as id
    var primaryKey = '0000000000'; // placeholder

    // build
    var userData = {
      id: primaryKey,
      name: playerName
    };

    res.json(userData);
  });

  router.post('/post/coordinates', function (req, res) {
    // store information from client coordinate post
    var data = req.body;

    var player = {
      id: data.id,
      name: data.name,
      latitude: data.latitude,
      longitude: data.longitude,
      direction: data.direction
    }
    // Insert 'player' object into mySQL database to update position and direction

    // select all from players table where the current player id does not equal the record's id
    // 'SELECT * FROM `PLAYERS` WHERE `id` NOT ?'
    // ? = userID

    // test data for multiplayerData
    var multiplayerData = [];
    var multiplayer = { id: null, name: null, latitude: null, longitude: null, direction: null };
    for (var i = 0; i < 2; i++) {
      multiplayerData.push(multiplayer);
    }

    res.json(multiplayerData);
  });


};
