// MAPBOX
var MapboxClient = require('mapbox');
var client = new MapboxClient('pk.eyJ1IjoibXFzY2h3YW5kYSIsImEiOiJjaXZvY3E2ZTcwMTc3MnpxdnEzdm1nZ25vIn0.DGfq6MDVPOekSDZ795bEDA');
var geoTag = client.geocodeForward('Chester, NJ', function(err, res) {
  return res;
});


module.exports = function (router) {

  router.get('/api/geoTag', function (req, res) {
    geoTag = "geoTag Object Here";
    res.json(geoTag);
  });

	router.post('/api/clear', function () {
		geoTag = null;
		console.log(geoTag);
	});

};
