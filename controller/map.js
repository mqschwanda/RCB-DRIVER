// SEQUELIZE
var User  = require('./../models')['User'];
User.sync({force:true});


module.exports = function (router) {

  router.post('/user', function (req, res) {
    // store information from client new username post
    var data = req.body;
    // insert new player record using data from client
    User.create({ name: data.name }).done(function(result) {
      // store information from client input and mySQL res
      var userData = {
        id: result.id, // primaryKey is returned in result
        name: data.name
      };
      // send data back to client so that user information can be stored locally
      res.json(userData);
    });
  }); // END: router.post('/player')

  router.post('/coordinates', function (req, res) {
    // store information from client coordinate post
    var data = req.body;
    // Update 'player' object with position and direction
    User.update({
      latitude: data.latitude,
      longitude: data.longitude,
      direction: data.direction
    }, {
      where: { id: data.id }
    }).then(function(result) {}, function(rejectedPromiseError) {});
    // select all from players table where the current player id does not equal the record's id
    var playerArray = []; // hold each player object
    User.findAll().then(function(result) {
      for (var i = 0; i < result.length; i++) {
        // point object with player information and location
        var point = {
          id: result[i].id,
          name: result[i].name,
          latitude: result[i].latitude,
          longitude: result[i].longitude,
          direction: result[i].direction
        }
        playerArray.push(point);
      }
      var featureArray = []; // will hold features to give geoJSON and later populate mapbox
      // iterate through an array cotaining every player on the map
      for (var i = 0; i < playerArray.length; i++) {
        // create a feature that represents an individual player
        var feature = {
          type: 'Feature',
          geometry: {
              type: 'Point',
              coordinates: [playerArray[i].longitude, playerArray[i].latitude]
          },
          properties: {
            id: playerArray[i].id,
            name: playerArray[i].name,
            direction: playerArray[i].direction,
            icon: {
              className: 'svg-marker-other-user', // class name to style
              iconSize: null, // size of icon, use null to set the size in CSS
              label: playerArray[i].name
            }
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
    });
  }); // END: router.post('/coordinates')

  router.get('/coordinates', function (req, res) {
    // Return all users from database
    var playerArray = []; // hold each player object
    User.findAll().then(function(result) {
      for (var i = 0; i < result.length; i++) {
        // point object with player information and location
        var point = {
          id: result[i].id,
          name: result[i].name,
          latitude: result[i].latitude,
          longitude: result[i].longitude,
          direction: result[i].direction
        }
        playerArray.push(point);
      }
      var featureArray = []; // will hold features to give geoJSON and later populate mapbox
      // iterate through an array cotaining every player on the map
      for (var i = 0; i < playerArray.length; i++) {
        // create a feature that represents an individual player
        var feature = {
          type: 'Feature',
          geometry: {
              type: 'Point',
              coordinates: [playerArray[i].longitude, playerArray[i].latitude]
          },
          properties: {
            id: playerArray[i].id,
            name: playerArray[i].name,
            direction: playerArray[i].direction,
            icon: {
              className: 'svg-marker-other-user', // class name to style
              iconSize: null, // size of icon, use null to set the size in CSS
              label: playerArray[i].name
            }
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
    });
  }); // END: router.get('/coordinates')

}; // END: module.exports
