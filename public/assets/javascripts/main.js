// define user
function User(id, name) {
  this.id = id || null;
  this.name = name || null;
  this.mapStyle = 'mapbox.light';
  this.miniMap = true;
}
if (typeof(Storage) !== 'undefined') { // Check browser support
  var currentUserID = localStorage.getItem('driverID');
  var currentUserName = localStorage.getItem('driverName');
}
var currentUser = new User(currentUserID, currentUserName);
// define the map settings
function mapSettings(user) {
  this.name = null;
  this.mapStyle = user.mapStyle;
  this.miniMap = user.miniMap;
  this.labels = true;
  this.updateSpeed = 10;
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
    keyboard: false
}).setView([37.9, -77],4);
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
marker.bindLabel(currentUser.name, { noHide: mapConfig.labels, opacity: 0.66, direction: 'auto' }).addTo(map);


var direction = 0, manual = false;
// Add manual control of the icon with left and right arrow keys
document.body.addEventListener('keydown', function(e) {
  if (e.which == 37) {
    direction -= player.turnSpeed; manual = true;
  }
  if (e.which == 39) {
    direction += player.turnSpeed; manual = true;
  }
}, true);
// autopilot code
// if (!manual && Math.random() > 0.95) {
//   direction += (Math.random() - 0.5) / 2;
// }

var currentURL = window.location.origin; // used to make post
var featureLayer = L.mapbox.featureLayer(); // used to update map players
// send client marker information to server and update all other players location
function updateMap () {
  // update user's marker location relative to its heading (direction)
  var markerLocation = marker.getLatLng(); // store the user's marker location
  markerLocation.lat += Math.cos(direction) / 100;
  markerLocation.lng += Math.sin(direction) / 100;
  //storage for dynamic longitude, latitude, direction
  data = {
    id: currentUser.id,
    name: currentUser.name,
    latitude: markerLocation.lat,
    longitude: markerLocation.lng,
    direction: direction
  };
  // post current user information to server and collect geoJSON data in the response
  $.post(currentURL + "/post/coordinates", data, function(res) {
    var geoJSON = res; // response from server
    // add player locations to map with geoJSON object
    featureLayer.setGeoJSON(geoJSON).addTo(map);
  });
  // update user's marker direction, latitude, and longitude
  marker.options.angle = direction * (180 / Math.PI);
  marker.setLatLng(markerLocation);
  // adjust map so current user's marker is in the center of the map
  map.panTo(marker.getLatLng());
} // END: function updateMap()


// updates all map markers that represent players
setInterval(updateMap, mapConfig.updateSpeed);
