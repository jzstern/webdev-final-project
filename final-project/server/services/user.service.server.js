module.exports = function (app) {
	// var cors = require('cors');
	app.get('/api/user', findAllUsers);
	app.get('/api/user/:userId', findUserById);
	app.post('/api/user', createUser);
	app.post('/api/login', login);
	app.post('/api/logout', logout);
	app.post('/api/register', register);
	app.get('/api/profile', profile);
	app.delete('/api/user/:userId', deleteUser);
	app.post('/api/user/:userId', updateUser);
	app.get('/api/user/:userId/follower', findAllFollowerForUser);
	app.get('/api/user/:userId/following', findAllFollowingForUser);

	var userModel = require('../models/user/user.model.server');
	//var bodyParser = require('body-parser');
	//app.use(bodyParser.json());


	// app.all('/', function(req, res, next) {
	// 	res.header("Access-Control-Allow-Origin", "*");
	// 	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	// 	next();
	// });

	// app.use(cors({ origin: 'http://localhost:3000' , credentials :  true}));

	function findUserById(req, res) {
		var id = req.params['userId'];
		userModel.findUserById(id)
			.then(function (user) {
				res.json(user);
			})
	}

	function findUserByUsername(req, res) {
		var username = req.params['username'];
		userModel.findUserByUsername(username)
			.then(function (user) {
				res.json(user);
			})
	}

	function profile(req, res) {
		res.send(req.session['currentUser']);
	}

	function createUser(req, res) {
		var user = req.body;
		// TODO ; add server side validation for empty fields
    // https://www.youtube.com/watch?v=gZ_fR6o98dE

		userModel
			.findUserByUsername(user.username)
			.then(function (existingUser) {
				console.log(existingUser)
				if (existingUser !== undefined) {
					console.log('no user of that name hurrr')
          console.log(user.username)
					// TODO ; also check if user w/ same email address already exists
					userModel.createUser(user)
						.then(function (user) {
							req.session['currentUser'] = user;
							res.send(user);
						})
				} else {
					res.sendStatus(500);
				}
			})
	}

	function deleteUser(req, res) {
		var user = req.body;
		userModel.deleteUser(user.id)
			.then(function(error, user) {
				if (user == null) {
					res.send(error, 404);
				}
				else {
					res.send(user);
				}
			})
	}

	function updateUser(req, res) {
		var user = req.body;
		userModel.updateUser(user.id, user)
			.then(function(error, user) {
				if (user == null) {
					res.send(error, 404);
				}
				else {
					res.send(user);
				}
			})
	}

	function register(req, res) {
		var username = req.body.username;
		var password = req.body.password;
		var newUser = {
			username: username,
			password: password
		};
		userModel
			.findUserByUsername(username)
			.then(function(user) {
				if (!user) {
					return userModel
						.createUser(newUser)}});
	}

	function findAllUsers(req, res) {
		userModel.findAllUsers()
			.then(function (users) {
				res.send(users);
			})
	}

	function login(req, res) {
		var user = req.body;

		userModel.findUserByCredentials(user)
			.then(function (user) {
				if (user) {
					req.session['currentUser'] = user;
					res.send(user);
				} else {
					console.log('didnt find em')
					res.sendStatus(404);
				}
			})
	}

	function logout(req, res) {
		req.session.destroy();
		res.send(200);
	}

	function findAllFollowingForUser(req, res) {
		var id = req.params['userId'];
		userModel.findAllFollowing(id)
			.then(function (users) {
				res.send(users);
			})
	}

	function findAllFollowerForUser(req, res) {
		var id = req.params['userId'];
		userModel.findAllFollower(id)
			.then(function (users) {
				res.send(users);
			})
	}
}