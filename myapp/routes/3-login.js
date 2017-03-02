var express = require("express");
var router = express.Router();
var mysql = require("mysql");

var connection = mysql.createConnection({
   host     : 'localhost',
   user     : 'testuser',
   password : 'User@123',
   database : 'CRUD_JS_ASS'
 });

router.get('/', function(req, res, next) {
	res.render('3-loginPg', {title: "Welcome to your new journey..."});
});

router.get('/register', function(req, res, next) {
	res.render('3-regisPg', {title: "Welcome to registration..."});
});

router.post('/registerDB', function(req, res, next) {
	connection.connect(function(err) {
	if(err) {
		console.log(err);
	} else {
		console.log("You are now connected.");
	}
	connection.query("CREATE TABLE IF NOT EXISTS CUSTOMERS(customer_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, name TEXT, password TEXT, email_id TEXT, mobile_number TEXT);", function(err, rows, fields) {
		if(!err) {
			console.log('The solution 1 is: ', rows);
		} else {
			console.log("Error occurred 1: " + err);
		}
		var uName = req.body["uName"];
		var uPassword = req.body["uPassword1"];
		var uEmailId = req.body["uEmailId"];
		var uMobileNum = req.body["uMobileNum"];
		connection.query("INSERT INTO CUSTOMERS(name, password, email_id, mobile_number) VALUES ('" + uName + "', '" + uPassword + "', '" + uEmailId + "', '" + uMobileNum + "');", function(err, row, fields) {
			if(!err) {
				console.log('The solution 2 is: ', rows);
			} else {
				console.log("Error occurred 2: " + err);
			}
		});
	});
});
	res.render('', {title: "Welcome to registration..."});
});

router.get('/teachLogin', function(req, res, next) {
	res.render('3-teachLoginPg', {title: "Welcome to Login Page..."});
});

router.get('/teachRegister', function(req, res, next) {
	res.render('3-teachRegPg', {title: "Welcome to Registration Page..."});
});

router.post('/registerStuDB', function(req, res, next) {
	connection.connect(function(err) {
		if(err) {
			console.log(err);
		} else {
			console.log("You are now connected in /registerStuDB.");
		}
		var uName = req.body["uName"];
		var uPassword = req.body["uPassword"];
		console.log("uName: " + uName);
		/*connection.query("DROP TABLE Registration;", function(err, rows, fields) {
			if(err) {

			} else {

			}
		});*/
		connection.query("CREATE TABLE IF NOT EXISTS Registration(id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, user_name TEXT, password TEXT);", function(err, row, fields) {
			if(err) {
				console.log("Errror occurred while creating Registration table: " + err);
				res.render('3-errorPg', {title: "Problem occurred in table creation!" + err});
			} else {
				connection.query("INSERT INTO Registration(user_name, password) VALUES('" + uName + "', '" + uPassword + "');", function(err, row, fields) {
					if(!err) {
						res.render('3-teachLoginPg', {title: "You registered successfully! Welcome to Login Page..."});
					} else {
						console.log('3-errorPg', {title: "Error occurred in Registration: " + err});
					}
				});
			}
		});
	});
	
});

router.post('/checkValidCreds', function(req, res, next) {
	var resArr = [];
	var uName = req.body["uName"];
	var uPassword = req.body["uPassword"];
	connection.connect(function(err, rows, fields) {
	if(err) {
		console.log(err);
	} else {
		console.log("You are now connected in /checkValidCreds.");
	}
	connection.query("SELECT count(*) from Registration where user_name='" + uName + "'", function(err, rows, fields) {
		if(!err) {
			var cou = 'count(*)';
			console.log("Rows: " + rows[0][cou]);
			if(parseInt(rows[0][cou]) == 0) {
				console.log("Please enter correct user name!");
			} else {
				connection.query("SELECT password from Registration where user_name='" + uName + "'", function(err, rows, fields) { 
					if(err) {
						console.log("Error occurred 1: " + err);
						res.render('3-errorPg', {title: "Wrong credentials entered. Please try to login with correct credentials!" + err});	
					} else {
						if(uPassword == rows[0]['password']) {
							res.redirect('/signin/showData');
							/*connection.query("SELECT * from Student", function(err, rows, fields) {
								if(!err) {
									for(var loop in rows) {
										var tempObj = {};
										tempObj.student_id = rows[loop].student_id;
										tempObj.first_name = rows[loop].first_name;
										tempObj.last_name = rows[loop].last_name;
										tempObj.sclass = rows[loop].sclass;
										tempObj.course = rows[loop].course;
										resArr.push(tempObj);
									}
									console.log("Password: " + rows[0]['password']);
									res.render('3-teachAskPg', {title: "Student Details!", res: resArr});
								} else {
									console.log("Error occurred 1: " + err);
								}
							});	*/		
						} else {
							console.log("Password: " + rows[0]['password']);
							res.render('3-errorPg', {title: "Wrong credentials entered. Please try to login with correct credentials!" + err});
						}
					}
				});	
			}
		} else {
			console.log("Error occurred while count(*) in /checkValidCreds: " + err);
		}
	});
});
	/*if(uName == "teacher" && uPassword == "12345") {
		var resArr = [];
		connection.connect(function(err) {
			if(err) {
				console.log(err);
			} else {
				console.log("You are now connected.");
			}
			connection.query("SELECT * from Student", function(err, rows, fields) {
				if(!err) {
					for(var loop in rows) {
						var tempObj = {};
						tempObj.student_id = rows[loop].student_id;
						tempObj.first_name = rows[loop].first_name;
						tempObj.last_name = rows[loop].last_name;
						tempObj.sclass = rows[loop].sclass;
						tempObj.course = rows[loop].course;
						resArr.push(tempObj);
					}
					res.render('3-teachAskPg', {title: "Student Details!", res: resArr});
				} else {
					console.log("Error occurred 1: " + err);
				}
			});
		});
	} else {
		res.render('3-errorPg', {title: "Wrong credentials entered. Please try to login with correct credentials!"});
	}*/
});

router.get('/showData', function(req, res, next) {
	var resArr = [];
	console.log("You are now ready to show data.");
	connection.query("SELECT * from Student", function(err, rows, fields) {
		if(!err) {
			for(var loop in rows) {
				var tempObj = {};
				tempObj.student_id = rows[loop].student_id;
				tempObj.first_name = rows[loop].first_name;
				tempObj.last_name = rows[loop].last_name;
				tempObj.sclass = rows[loop].sclass;
				tempObj.course = rows[loop].course;
				resArr.push(tempObj);
			}
			console.log("Password: " + rows[0]['password']);
			res.render('3-teachAskPg', {title: "Student Details!", res: resArr});
		} else {
			console.log("Error occurred 1: " + err);
			res.render('3-errorPg', {title: "Something went wrong! " + err});
		}
	});
});

router.get('/teachAskConfirmAdd', function(req, res, next) {
	res.render('3-teachAddPg', {title: "Add Student Details..."});
});

router.get('/teachAskConfirmUpdate', function(req, res, next) {
	var resArr = [];
	connection.connect(function(err) {
		if(err) {
			console.log(err);
		} else {
			console.log("You are now connected.");
		}
		connection.query("SELECT * from Student", function(err, rows, fields) {
			if(!err) {
				for(var loop in rows) {
					var tempObj = {};
					tempObj.student_id = rows[loop].student_id;
					tempObj.first_name = rows[loop].first_name;
					tempObj.last_name = rows[loop].last_name;
					tempObj.sclass = rows[loop].sclass;
					tempObj.course = rows[loop].course;
					resArr.push(tempObj);
				}
				/*console.log(resArr);
				console.log(rows[0].student_id);
        		console.log(rows[0].first_name);
        		console.log(rows[0].last_name);
        		console.log(rows[0].class);
        		console.log(rows[0].course);*/
				//setValue(rows);
				res.render('3-teachUpdatePg', {title: "Update Student Details...", res: resArr});
			} else {
				console.log("Error occurred 1: " + err);
			}
		});
		/*function setValue(value) {
			var res = [];
  			res = value;
  			console.log(res);
		}*/
	});
	
});

router.post('/updateLoad', function(req, res, next) {
	var resArr = [];
	var selectCtrl = parseInt(req.body["selectId"]);
	connection.connect(function(err) {
	if(err) {
		console.log(err);
	} else {
		console.log("You are now connected.");
	}
	connection.query("SELECT * FROM Student WHERE student_id='" + selectCtrl + "';", function(err, rows, fields) {
		if(!err) {
			console.log('The solution 1 is: ', rows);
			for(var loop in rows) {
					var tempObj = {};
					tempObj.student_id = rows[loop].student_id;
					tempObj.first_name = rows[loop].first_name;
					tempObj.last_name = rows[loop].last_name;
					tempObj.sclass = rows[loop].sclass;
					tempObj.course = rows[loop].course;
					console.log("Object is: " + tempObj.first_name);
					resArr.push(tempObj);
				}
				console.log("Array is: " + resArr[0].student_id);
				res.render('3-teachUpdateUIPg', {title: "Update Student Details...", res: resArr});
		} else {
			console.log("Error occurred 1: " + err);
		}
		
	});
});

});

router.post('/updateFinalDB', function(req, res, next) {
	connection.connect(function(err) {
		if(err) {
			console.log(err);
		} else {
			console.log("You are now connected.");
		}
		var studentId = parseInt(req.body["studentNameId"]);
		var stuFName = req.body["stuFName"];
		var stuLName = req.body["stuLName"];
		var stuClass = req.body["stuClass"];
		var stuCourse = req.body["stuCourse"];
		console.log("Id: " + studentId);
		connection.query("UPDATE Student SET first_name='" + stuFName + "', last_name='" + stuLName + "', sclass='" + stuClass + "', course='" + stuCourse + "' WHERE student_id=" + studentId + ";", function(err, row, fields) {
			if(err) {
				console.log("Errror occurred while updating data: " + err);
				res.render('3-errorPg', {title: "Data not updated!" + err});
			} else {
				res.render('3-errorPg', {title: "Student Updated Successfully!"});
			}
		});
		
	});
});

router.post('/teachAddDB', function(req, res, next) {
	connection.connect(function(err) {
		if(err) {
			console.log(err);
		} else {
			console.log("You are now connected.");
		}
		connection.query("CREATE TABLE IF NOT EXISTS Student(student_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, first_name TEXT, last_name TEXT, sclass TEXT, course TEXT);", function(err, rows, fields) {
			if(!err) {
				console.log('The solution 1 is: ', rows);
			} else {
				console.log("Error occurred 1: " + err);
			}
			var stuFName = req.body["stuFName"];
			var stuLName = req.body["stuLName"];
			var stuClass = req.body["stuClass"];
			var stuCourse = req.body["stuCourse"];
			connection.query("INSERT INTO Student(first_name, last_name, sclass, course) VALUES ('" + stuFName + "', '" + stuLName + "', '" + stuClass + "', '" + stuCourse + "');", function(err, row, fields) {
				if(!err) {
					res.render('3-errorPg', {title: "Student Added Successfully!"});
				} else {
					console.log('3-errorPg', {title: "Error occurred 2: " + err});
				}
			});
		});
	});
});

router.get('/teachAskDelete', function(req, res, next) {
	var resArr = [];
	connection.connect(function(err) {
		if(err) {
			console.log(err);
		} else {
			console.log("You are now connected in delete API.");
		}
		connection.query("SELECT * from Student", function(err, rows, fields) {
			if(!err) {
				for(var loop in rows) {
					var tempObj = {};
					tempObj.student_id = rows[loop].student_id;
					tempObj.first_name = rows[loop].first_name;
					tempObj.last_name = rows[loop].last_name;
					tempObj.sclass = rows[loop].sclass;
					tempObj.course = rows[loop].course;
					resArr.push(tempObj);
				}
				res.render('3-teachDeletePg', {title: "Delete Student...", res: resArr});
			} else {
				console.log("Error occurred 1: " + err);
			}
		});
		
	});
});

router.post('/deleteLoad', function(req, res, next) {
	var resArr = [];
	var selectCtrl = parseInt(req.body["selectId"]);
	connection.connect(function(err) {
	if(err) {
		console.log(err);
	} else {
		console.log("You are now connected.");
	}
	connection.query("SELECT * FROM Student WHERE student_id='" + selectCtrl + "';", function(err, rows, fields) {
		if(!err) {
			console.log('The deleteion solution 1 is: ', rows);
			for(var loop in rows) {
					var tempObj = {};
					tempObj.student_id = rows[loop].student_id;
					tempObj.first_name = rows[loop].first_name;
					tempObj.last_name = rows[loop].last_name;
					tempObj.sclass = rows[loop].sclass;
					tempObj.course = rows[loop].course;
					console.log("Delete Object is: " + tempObj.first_name);
					resArr.push(tempObj);
				}
				console.log("Deletion Array is: " + resArr[0].student_id);
				res.render('3-teachDeleteUIPg', {title: "Delete Student Details...", res: resArr});
		} else {
			console.log("Error occurred 1: " + err);
		}
		
	});
	});

});

router.post('/deleteFinalDB', function(req, res, next) {
	connection.connect(function(err) {
		if(err) {
			console.log(err);
		} else {
			console.log("You are now connected.");
		}
		var studentId = parseInt(req.body["studentNameId"]);
		var stuFName = req.body["stuFName"];
		var stuLName = req.body["stuLName"];
		var stuClass = req.body["stuClass"];
		var stuCourse = req.body["stuCourse"];
		console.log("Id: " + studentId);
		connection.query("DELETE FROM Student WHERE student_id=" + studentId + ";", function(err, row, fields) {
			if(err) {
				console.log("Errror occurred while updating data: " + err);
				res.render('3-errorPg', {title: "Data not deleted!" + err});
			} else {
				res.render('3-errorPg', {title: "Student data deleted Successfully!"});
			}
		});
		
	});
});

// **************************    Table Section Code     **********************************

router.get('/updateTableLoad/:input', function(req, res, next) {
	var resArr = [];
	var ID = req.params.input;
	console.log("Id: " + ID);
	connection.connect(function(err) {
		if(err) {
			console.log(err);
		} else {
			console.log("You are now connected in /updateTableLoad/:id.");
		}

		connection.query("SELECT * FROM Student WHERE student_id=?;",[ID], function(err, rows, fields) {
			if(!err) {
				console.log('The solution 1 is: ', rows);
				for(var loop in rows) {
						var tempObj = {};
						tempObj.student_id = rows[loop].student_id;
						tempObj.first_name = rows[loop].first_name;
						tempObj.last_name = rows[loop].last_name;
						tempObj.sclass = rows[loop].sclass;
						tempObj.course = rows[loop].course;
						console.log("Object is: " + tempObj.first_name);
						resArr.push(tempObj);
					}
					console.log("Array is: " + resArr[0].student_id);
					res.render('3-teachUpdateUIPg', {title: "Update Student Details...", res: resArr});
			} else {
				console.log("Error occurred 1: " + err);
			}
		
		});
	});

});

router.get('/deleteTableLoad/:input', function(req, res, next) {
	var resArr = [];
	var ID = req.params.input;
	connection.connect(function(err) {
	if(err) {
		console.log(err);
	} else {
		console.log("You are now connected in /deleteTableLoad:input.");
	}
	connection.query("SELECT * FROM Student WHERE student_id=?;",[ID], function(err, rows, fields) {
		if(!err) {
			console.log('The deleteion solution 1 is: ', rows);
			for(var loop in rows) {
					var tempObj = {};
					tempObj.student_id = rows[loop].student_id;
					tempObj.first_name = rows[loop].first_name;
					tempObj.last_name = rows[loop].last_name;
					tempObj.sclass = rows[loop].sclass;
					tempObj.course = rows[loop].course;
					console.log("Delete Object is: " + tempObj.first_name);
					resArr.push(tempObj);
				}
				console.log("Deletion Array is: " + resArr[0].student_id);
				res.render('3-teachDeleteUIPg', {title: "Delete Student Details...", res: resArr});
		} else {
			console.log("Error occurred 1: " + err);
		}
		
	});
	});

});
module.exports = router;