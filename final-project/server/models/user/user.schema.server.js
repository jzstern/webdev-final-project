var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var PlaylistSchema = require('../playlist/playlist.schema.server');

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
	playlists: [PlaylistSchema]
}, {collection: 'user'});

module.exports = userSchema;
