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
	following: [String],
	followers: [String],
	likedSongs: [String],
	repostedSongs: [String],
	twitterProvider: {
      type: {
        id: [String],
        token: [String]
      },
      select: false
    }
}, {collection: 'user'});

module.exports = userSchema;
