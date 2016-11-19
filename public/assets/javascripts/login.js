$(".submit").on("click", function(){
  var newUser = {
      email: $('#email').val().trim(),
      password: $('#password').val().trim(),
      confirmPassword: $('#confirmPassword').val().trim()
  };
  // validate password inputs match
  if(newUser.password != newUser.confirmPassword){
      alert("Passwords did not match")
  } else {
    // Creat login
    var currentURL = window.location.origin;
    $.post(currentURL + "/api/createLogin", newUser,
    function(data){
      // Return flag if email is a duplicate
      if(data == true){
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
