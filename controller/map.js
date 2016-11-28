module.exports = function (router) {


  router.post('/post/player', function (req, res) {
    // store information from client new username post
    var data = req.body;
    var playerName = data.name;
    // insert 'player.name 'into mySQL database and return primary key as id
    var primaryKey = '0000000000'; // placeholder
    // store information from client and mySQL insert
    var userData = {
      id: primaryKey,
      name: playerName
    };
    // send data back to client so that user information can be stored locally
    res.json(userData);
  }); // END: router.post('/post/player')


  router.post('/post/coordinates', function (req, res) {
    // store information from client coordinate post
    var data = req.body;
    // create object to hold all data received from client in post
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

    // PLACEHOLDER FOR THE FORMATING OF EACH PLAYER RETURNED IN 'mySQL' QUERY
    // PLACEHOLDER: player object with information and location
    var testPoint = {
      id: 'test',
      name: 'geoJSON test',
      latitude: -79.00,
      longitude: 40,
      direction: null
    }
    var playerArray = []; // hold each player object
    playerArray.push(testPoint);
    var featureArray = []; // will hold features to give geoJSON and later populate mapbox
    // iterate through an array cotaining every player on the map
    for (var i = 0; i < playerArray.length; i++) {
      // create a feature that represents an individual player
      var feature = {
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [playerArray[i].latitude, playerArray[i].longitude]
        },
        properties: {
          title: playerArray[i].name
        }
      }
      // push individual feature to an array of features
      featureArray.push(feature);
    }
    // create geoJSON object that mapbox can read
    var geoJSON = {
      type: 'FeatureCollection',
      features: featureArray
    };
    // send the geoJSON object back to client so that all players can be displayed
    res.json(geoJSON);
  }); // END: router.post('/post/coordinates')


}; // END: module.exports
