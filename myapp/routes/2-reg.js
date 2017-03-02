var express = require("express");
var router = express.Router();

router.get('/', function(req, res, next) {
	tit = "Welcome to Login Page of Mantra Labs!";
	res.render('2-regPg', {title: tit});
});

router.post('/checkValidCred', function(req, res, next) {
	var uName = req.body["uName"];
	var uPassword = req.body["uPassword"];
	if(uName == "mantra" && uPassword == "123") {
		tit = "Welcome to Mantra Labs!";
		res.render('2-showRes', {title: tit});
	} else {
		tit = "Wrong credentials entered! Please try to login with correct credentials!";
		res.render('2-showRes', {title: tit});
	}
});

module.exports = router;