function allowSubmit() {
  if (emailPass && passwordPass) {
    $('#user-submit').removeClass('disabled');
  }
}

// Email verification
var emailPass = false;
$('#email-input').change(function() {
  var inputValue = $(this).val();
  var currentURL = window.location.origin;
  $.post(currentURL + "/api/checkEmail", inputValue, function(userExists){
    // Return flag if email is a duplicate
    if(userExists == true){
        alert("User with email already exists")
    } else {
      emailPass = true;
      console.log('pass email');
      allowSubmit();
    }
  });
});
// Password verification
var passwordPass = false;
$('#password-input, #confirm-password-input').change(function() {
  var passwordValue = $('#password-input').val().trim();
  var confirmValue = $('#confirm-password-input').val().trim();
  // Return flag if passwords are not the same
  if(passwordValue != '' && confirmValue != '' && passwordValue != confirmValue){
      alert("Passwords do not match")
  } else {
    passwordPass = true;
    console.log('pass password');
    allowSubmit();
  }
});





$("#user-submit").on("click", function(){
  var newUser = {
      email: $('#email').val().trim(),
      password: $('#password').val().trim(),
      confirmPassword: $('#confirmPassword').val().trim()
  };

  // validate password inputs match
  if(newUser.password != newUser.confirmPassword){
      alert("Passwords did not match") // eliminate for on form validation
  } else {
    // Creat login
    var currentURL = window.location.origin;
    $.post(currentURL + "/api/createLogin", newUser,
    function(userExists){
      // Return flag if email is a duplicate
      if(userExists == true){
          alert("User with email already exists")
      }
      // Clear email input on success
      $('#email').val("");
    });
  }
  // Clear password and confirm password inputs
  $('#password').val("");
  $('#confirmPassword').val("");
  return false;
});
