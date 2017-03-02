var express = require("express");
var router = express.Router();

router.get('/', function(req, res, next) {
	console.log("from /");
	var strArr = ["Vishal Garg", "On the way of creating 1st API..."];
	var tit = "Welcome to our new learning of Node.Js Express...";
	res.render('1-hello', {title: tit, titleArr: strArr});
});

router.get('/add', function(req, res, next) {
	console.log("from /add");
	var intArr = [12, 34, 45, 33, 23];
	var tit = "Welcome to our new learning of Node.Js Express...";
	res.render('1-2-add', {title: tit, titleArr: intArr});
});

router.post('/printAdd', function(req, res, next) {
	console.log("to /printAdd");
	var sum = req.body["text1"];
	console.log("Sum of Array: ", sum);
	res.render('1-2-printAdd', {sumArr: sum});
});

router.get('/obj', function(req, res, next) {
	console.log("from /obj");
	var strArr = "On the way of creating few API(s)...";
	var cars = {
				volvoCar: {type: "Volvo", year: 2017},
				saabCar: {type: "Saab", year: 2016},
				bmwCae: {type: "BMW", year: 2015}
			}
	res.render('1-3-obj', {title: strArr, objRef: cars});			
});

module.exports = router;