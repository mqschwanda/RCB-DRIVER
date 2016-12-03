// define user
function User(id, name) {
  this.id = id || null;
  this.name = name || null;
  this.mapStyle = 'mapbox.light';
  this.mapStyle = 'mapbox.outdoors';
  this.mapStyle = 'mapbox.outdoors';
  this.miniMap = false;
}
var currentUsername, currentUserID;
if (typeof(Storage) !== 'undefined') { // Check browser support
  console.log('Driver ID: ' + sessionStorage.driverID);
  console.log('Driver Name: ' + sessionStorage.driverName);
  currentUserID = sessionStorage.driverID;
  currentUsername = sessionStorage.driverName;
}
var currentUser = new User(currentUserID, currentUsername);
// define the map settings
function mapSettings(user) {
  this.name = null;
  this.mapStyle = user.mapStyle;
  this.miniMap = user.miniMap;
  this.labels = true;
  this.updateSpeed = 10;
  this.keyboard = false;

}
var mapConfig = new mapSettings(currentUser);
// define the user's settings
function Toon(user) {
  this.userName = user.name;
  // return value with range [-90,90]
  function randomLatitude() {
    return 90-Math.random()*180;
  }
  this.latInit = randomLatitude();
  // return value with range [-180,180]
  function randomLongitude() {
    return 180-Math.random()*360;
  }
  this.longInit = randomLongitude();
  var types = ['Boeing 747','airplane4','airplane5','airplane8','prop-plane','space-shuttle','rocket-ship'];
  // var typesIndex = Math.floor(Math.random()*types.length);
  // this.type = types[typesIndex];
  this.type = types[0];
  var typeClass = this.type;
  typeClass = typeClass.toLowerCase();
  typeClass = typeClass.replace(' ','');
  this.typeClass = typeClass;
  this.altitude = 0; // layer depth for icons
  this.turnSpeed = 0.05;
  this.transitionSpeed = null; // in ms
  this.size = 25; // in px
  this.draggable = false;
}
var player = new Toon(currentUser);


// access token
L.mapbox.accessToken = 'pk.eyJ1Ijoic3V6YWt1MSIsImEiOiJjaXZwZG1qMTMwMWZnMnpwNWZsbmtyOGE0In0.kn43gd2YQghUwl_4pJZ65Q';
// configure mapbox to display in browser
var map = L.mapbox.map('live-map', mapConfig.mapStyle, {
  keyboard: mapConfig.keyboard,
  worldCopyJump: true,
  zoom: 2,
  minZoom: 2,
  maxBounds: [[-90, -180],[90, 180]],
  center: [0, 0]
});

map.scrollWheelZoom.disable(); // remove scrolling function of the map
L.control.fullscreen().addTo(map); // add full screen button to map
// add mini map to display
if (mapConfig.miniMap) { // if mini map feature is turned on
  var miniMap = new L.Control.MiniMap(L.mapbox.tileLayer(mapConfig.mapStyle));
  miniMap.addTo(map, { toggleDisplay: true });
}


// add rotating cabaility to standard marker
L.RotatedMarker = L.Marker.extend({
  options: { angle: 0 },
  _setPos: function(pos) {
    L.Marker.prototype._setPos.call(this, pos);
    // user's marker  transition style
    if (player.transitionSpeed != null && L.DomUtil.TRANSITION) {
        var transitionSpeed = player.transitionSpeed;
        if (this._icon) { this._icon.style[L.DomUtil.TRANSITION] = ('all ' + transitionSpeed + 'ms linear'); }
    }
    // user's marker rotation style
    if (L.DomUtil.TRANSFORM) { // use the CSS transform rule if available
      this._icon.style[L.DomUtil.TRANSFORM] += ' rotate(' + this.options.angle + 'deg)';
    } else if (L.Browser.ie) { // fallback for IE6, IE7, IE8
      var rad = this.options.angle * L.LatLng.DEG_TO_RAD,
      costheta = Math.cos(rad),
      sintheta = Math.sin(rad);
      this._icon.style.filter += ' progid:DXImageTransform.Microsoft.Matrix(sizingMethod=\'auto expand\', M11=' +
        costheta + ', M12=' + (-sintheta) + ', M21=' + sintheta + ', M22=' + costheta + ')';
    }
  }
});
L.rotatedMarker = function(pos, options) {
    return new L.RotatedMarker(pos, options);
};


// create user's marker to be displayed on map locally
var marker = L.rotatedMarker(new L.LatLng(player.latInit, player.longInit), {
  icon: L.divIcon({
    className: 'svg-marker-'+player.typeClass,
    title: player.userName,
    zIndexOffset: player.altitude,
    riseOnHover: true,
    iconSize: [player.size, player.size]
  }),
  draggable: player.draggable
});
// add label to user's marker with relevent information
marker.bindLabel(currentUser.name, { noHide: true, opacity: 0.5, direction: 'auto' }).addTo(map);
// Add manual control of the icon with left and right arrow keys
var direction = 0;
document.body.addEventListener('keydown', function(e) {
  if (e.which == 37) {
    direction -= player.turnSpeed;
  }
  if (e.which == 39) {
    direction += player.turnSpeed;
  }
}, true);
var currentURL = window.location.origin; // used to make post
var featureLayer = L.mapbox.featureLayer().addTo(map); // used to update map players
// send client marker information to server and update all other players location
function updateMap () {
  // update user's marker location relative to its heading (direction)
  var markerLocation = marker.getLatLng(); // store the user's marker location
  markerLocation.lat += Math.cos(direction) / 100;
  markerLocation.lng += Math.sin(direction) / 100;
  // conditionals to wrap marker when it reaches lat/lng bounds
  if (markerLocation.lat >= 90) {
    markerLocation.lat -= 180;
  } else if (markerLocation.lat <= -90) {
    markerLocation.lat += 180
  }
  if (markerLocation.lng >= 180) {
    markerLocation.lng -= 360;
  } else if (markerLocation.lng <= -180) {
    markerLocation.lng += 360
  }
  //storage for dynamic longitude, latitude, direction
  data = {
    id: currentUser.id,
    name: currentUser.name,
    latitude: markerLocation.lat,
    longitude: markerLocation.lng,
    direction: direction
  };
  // post current user information to server and collect geoJSON data in the response
  $.post(currentURL + "/coordinates", data, function(res) {
    var geoJSON = res; // response from server
    // console.log(JSON.stringify(geoJSON.features[0].properties.id));
    // add player locations to map with geoJSON object
    for (var i = 0; i < geoJSON.features.length; i++) {
      if (geoJSON.features[i].properties.id == currentUserID) {
        delete geoJSON.features[i];
      }
    }
    featureLayer.setGeoJSON(geoJSON);
  });
  // update user's marker direction, latitude, and longitude
  marker.options.angle = direction * (180 / Math.PI);
  marker.setLatLng(markerLocation);
  // adjust map so current user's marker is in the center of the map
  map.panTo(marker.getLatLng());
} // END: function updateMap()


// updates all map markers that represent players
setInterval(updateMap, mapConfig.updateSpeed);
