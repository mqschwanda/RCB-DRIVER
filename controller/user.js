module.exports = function (router) {

  var userData = []; //temp to hold user data
  router.post('/api/createLogin', function (req, res) {
  	// Store information from client form post
  	var newUser = req.body;
  	var emailExists;
  	// Check for user with existing email
  	for (var i = 0; i < userData.length; i++) {
  		if (userData[i].email == newUser.email) {
  			emailExists = true;
  		}
  	}
  	// Add new user to database
  	userData.push(newUser);
  	// Send flag for user with existing email
  	res.json(emailExists);
  });

};
