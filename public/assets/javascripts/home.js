$(document).ready(function() {
  Materialize.updateTextFields();
});

var currentURL = window.location.origin;

$("#play-btn").on("click", function(){
  // grab username from input field
  var userName = $('#userName-input').val().trim();
  if (userName == "") { // establish guest user if input is empty
    userName = 'GUEST'
  } else { // make username uppercase
    userName = userName.toUpperCase();
  }
  // create player in database and return user id
  var data = { name: userName };
  $.post(currentURL + '/post/player', data, function(res){
    // Store ID and Name of user in local browser storage for access latter.
    if (typeof(Storage) !== 'undefined') { // Check browser support
      localStorage.setItem('driverID', res.id);
      localStorage.setItem('driverName', res.name);
    } else {
      alert('Please update your browser to play Driver')
    }
  });
});
