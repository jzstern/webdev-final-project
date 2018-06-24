var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    displayName: String,
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
