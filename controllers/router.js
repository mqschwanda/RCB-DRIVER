var express = require('express');
var router = express.Router();

// HOME PAGE set as default
router.get('/', function (req, res) {
	res.redirect('/home');
});

// HOME PAGE
router.get('/home', function (req, res) {
	var hbsObject = null; // handlebars requires a variable even if null
	res.render('home', hbsObject);
});

// PRODUCT VIEW
router.get('/product', function (req, res) {
	var hbsObject = null; // handlebars requires a variable even if null
	res.render('product', hbsObject);
});

// SHOPPING CART
router.get('/shopping-cart', function (req, res) {
	var hbsObject = null; // handlebars requires a variable even if null
	res.render('cart', hbsObject);
});

// CUSTOMER CHECKOUT
router.get('/checkout', function (req, res) {
	var hbsObject = null; // handlebars requires a variable even if null
	res.render('checkout', hbsObject);
});

// CUSTOMER CHECKOUT
router.get('/database', function (req, res) {
	var hbsObject = null; // handlebars requires a variable even if null
	res.render('database', hbsObject);
});

// EXPORT
module.exports = router;
