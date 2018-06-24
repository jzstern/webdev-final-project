var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = mongoose.Schema({
	email: String,
	username: String,
	password: String,
	firstName: String,
	lastName: String,
	displayName: String,
	accountType: String,
	following: [{
		user: {
			type: Schema.Types.ObjectId,
			ref: 'user'
		}
	}],
	followers: [{
		user: {
			type: Schema.Types.ObjectId,
			ref: 'user'
		}
	}],
	likedSongs: [],
	repostedSongs: []
}, {collection: 'user'});

module.exports = userSchema;
