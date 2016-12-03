$(document).ready(function() {
  Materialize.updateTextFields();
});

var currentURL = window.location.origin;

$("#play-btn").on("click", function(){
  // grab username from input field
  var username = $('#username-input').val().trim();
  if (username == "") { // establish guest user if input is empty
    username = 'GUEST'
  } else { // make username uppercase
    username = username.toUpperCase();
  }
  // create player in database and return user id
  var data = { name: username };
  $.post(currentURL + '/user', data, function(res) {
    // Store ID and Name of user in local browser storage for access latter.
    if (typeof(Storage) !== 'undefined') { // Check browser support
      sessionStorage.driverID = res.id;
      sessionStorage.driverName = res.name;
      window.location.replace(currentURL + '/play');
    } else {
      alert('Please update your browser to play Driver');
    }
  });
});
