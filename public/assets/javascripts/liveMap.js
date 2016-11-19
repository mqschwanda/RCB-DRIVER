// GET geoTag FROM SERVER
var getGeoTag = function() {
  var currentURL = window.location.origin;
  $.ajax({url: currentURL + "/api/geoTag", method: "GET"})
    .done(function(geoTag) {
      console.log("------------------------------------");
      console.log("URL: " + currentURL + "/api/geoTag");
      console.log("------------------------------------");
      console.log(geoTag);
      console.log("------------------------------------");
    });
}
getGeoTag();


// INITIALIZE MAP
L.mapbox.accessToken = 'pk.eyJ1IjoibXFzY2h3YW5kYSIsImEiOiJjaXZvY3E2ZTcwMTc3MnpxdnEzdm1nZ25vIn0.DGfq6MDVPOekSDZ795bEDA';
var map = L.mapbox.map('live-map', 'mapbox.light');
map.scrollWheelZoom.disable();
  // As with any other AJAX request, this technique is subject to the Same Origin Policy:
  // http://en.wikipedia.org/wiki/Same_origin_policy
  var featureLayer = L.mapbox.featureLayer()
  .loadURL('https://wanderdrone.appspot.com/')
  // Once this layer loads, we set a timer to load it again in a few seconds.
  .on('ready', run)
  .addTo(map);
  // timeout to run wander drone function
  function run() {
    featureLayer.eachLayer(function(l) {
        map.panTo(l.getLatLng());
    });
    window.setTimeout(function() {
        featureLayer.loadURL('https://wanderdrone.appspot.com/');
    }, 1000);
  }
