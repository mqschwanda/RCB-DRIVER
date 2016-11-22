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




// Load user preferences for map
function User(name) {
  this.name = name;
  this.mapStyle = 'mapbox.light';
  this.miniMap = true;
}
var currentUser = new User('John "Test" Smith');

function mapSettings(user) {
  this.name = null;
  this.mapStyle = user.mapStyle;
  this.miniMap = user.miniMap;
  this.labels = true;
}
var mapConfig = new mapSettings(currentUser);

function Toon(user) {
  this.userName = user.name;
  // function returns a random coordinate between -90 and 90
  function randomCoordinate() {
    var coordinate = Math.random()*180-90;
    return coordinate;
  }
  this.latInit = randomCoordinate();
  this.longInit = randomCoordinate();
  var types = ['Boeing 747','airplane4','airplane5','airplane8','prop-plane','space-shuttle','rocket-ship'];
  var typesIndex = Math.floor(Math.random()*types.length);
  this.type = types[typesIndex];
  this.type = types[0];
  var typeClass = this.type;
  typeClass = typeClass.toLowerCase();
  typeClass = typeClass.replace(' ','');
  this.typeClass = typeClass;
  this.altitude = 0; // layer depth for icons
  this.speed = null;
  this.turnSpeed = 0.05;
  this.transitionSpeed = null; // in ms
  this.size = 25; // in px
  this.draggable = false;
}
var player = new Toon(currentUser);




  L.mapbox.accessToken = 'pk.eyJ1Ijoic3V6YWt1MSIsImEiOiJjaXZwZG1qMTMwMWZnMnpwNWZsbmtyOGE0In0.kn43gd2YQghUwl_4pJZ65Q';
  // MIT-licensed code by Benjamin Becquet
  // https://github.com/bbecquet/Leaflet.PolylineDecorator
  L.RotatedMarker = L.Marker.extend({
    options: { angle: 0 },
    _setPos: function(pos) {
      L.Marker.prototype._setPos.call(this, pos);

      // player transition style
      if (player.transitionSpeed != null && L.DomUtil.TRANSITION) {
          var transitionSpeed = player.transitionSpeed;
          if (this._icon) { this._icon.style[L.DomUtil.TRANSITION] = ('all ' + transitionSpeed + 'ms linear'); }
      }

      // player rotation style
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

  var map = L.mapbox.map('live-map', mapConfig.mapStyle, {
      keyboard: false
  }).setView([37.9, -77],4);

  map.scrollWheelZoom.disable();
  L.control.fullscreen().addTo(map);

// MINI MAP
if (mapConfig.miniMap) {
  var miniMap = new L.Control.MiniMap(L.mapbox.tileLayer(mapConfig.mapStyle));
  miniMap.addTo(map, { toggleDisplay: true });
}

  var marker = L.rotatedMarker(new L.LatLng(player.latInit, player.longInit), {
    icon: L.divIcon({
      className: 'svg-marker-'+player.typeClass,
      title: player.userName,
      zIndexOffset: player.altitude,
      riseOnHover: true,
      speed: 1,
      // html: '<svg xmlns="http://www.w3.org/2000/svg" width="'+player.size+'" height="'+player.size+'" viewBox="0 0 15 15"><path d="M15 6.818V8.5l-6.5-1-.318 4.773L11 14v1l-3.5-.682L4 15v-1l2.818-1.727L6.5 7.5 0 8.5V6.818L6.5 4.5v-3s0-1.5 1-1.5 1 1.5 1 1.5v2.818l6.5 2.5z"/></svg>', //image being used, must be in svg
      iconSize: [player.size, player.size]
    }),
    draggable: player.draggable
  });

  marker.bindLabel(player.type, { noHide: mapConfig.labels, opacity: 0.66, direction: 'auto' }).addTo(map);

  var direction = 0, manual = false;

  window.setInterval(function() {
    var ll = marker.getLatLng();
    ll.lat += Math.cos(direction) / 100;
    ll.lng += Math.sin(direction) / 100;

    //dynamic latitude and longitude
    map.panTo(marker.getLatLng());

    marker.options.angle = direction * (180 / Math.PI);
    marker.setLatLng(ll);
    if (!manual && Math.random() > 0.95) {
      direction += (Math.random() - 0.5) / 2;
    }
  }, 10);

  // Add manual control of the icon with left and right arrow keys
  document.body.addEventListener('keydown', function(e) {
    if (e.which == 37) {
      direction -= player.turnSpeed; manual = true;
    }
    if (e.which == 39) {
      direction += player.turnSpeed; manual = true;
    }
  }, true);
