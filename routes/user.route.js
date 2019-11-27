var express = require('express');
var router = express.Router();

var mysql = require('../connect_mysql/mysql');
var bodyParser = require('body-parser');

var users= mysql.connect(function (req, res) {
  var sql = "SELECT * FROM staff";
  mysql.query(sql, function(err, results) {
    if(err) throw err;
   users = results;
  });
});

router.use(bodyParser.json()) // for parsing application/json
router.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

router.get('/', function(req, res){
	res.render('users/index',{
		users: users
	});
});

router.get('/search', function(req, res){
	var q= req.query.q;
	var matchedUsers = users.filter(function(user){
		return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1 ;
	});
	
	res.render('users/index',{
		users: matchedUsers
	});
});

router.get('/create', function(req, res){
	res.render('users/create');
});

router.post('/create', function(req, res){
	var id = null;
	var {name, birthday, gender, address, phone, email, pass} =req.body;
	var errors = [];
	if(!req.body.name){
		errors.push('Name is required.')
	}
	if(!req.body.birthday){
		errors.push('Birthday is required.')
	}
	if(!req.body.gender){
		errors.push('Gender is required.')
	}
	if(!req.body.address){
		errors.push('Address is required.')
	}
	if(!req.body.phone){
		errors.push('Phone is required.')
	}
	if(!req.body.email){
		errors.push('Email is required.')
	}
	if(!req.body.pass){
		errors.push('Password is required.')
	}
	if(errors.length){
		res.render('users/create',{
			errors: errors,
			values: req.body
		});
		return;
	}
	var sql = "INSERT INTO `staff` (`id`, `name`, `birthday`, `gender`, `address`, `phone`, `email`, `pass`) VALUES (" + mysql.escape(id) + "," + mysql.escape(name) + "," + mysql.escape(birthday) + "," + mysql.escape(gender) + "," + mysql.escape(address) + "," + mysql.escape(phone) + "," + mysql.escape(email) + "," + mysql.escape(pass) + ")";
	mysql.query(sql, function(err, results){
		if(err) throw err;
	req.body = results;
	});
	users.push(req.body);
	res.redirect('/users'); //quay lai trang users
});



router.get('/login', function(req, res){
	res.render('users/login');
})

router.post('/login', function(req, res){

});

router.get('/:id', function(req, res){
	var id = parseInt(req.params.id);
	//console.log(id);
	var sql1 = "SELECT * FROM staff";
	mysql.query(sql1, function(err, results) {
    if(err) throw err;
    
   	var kq = results.forEach(function(elements){
   		if(elements.id == id) 
   			res.render('users/view', {
			user : elements
		});
   	});
   	});
});


module.exports = router;