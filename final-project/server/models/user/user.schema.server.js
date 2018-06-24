var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    following: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: 'user'
        }
    }],
    follower: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: 'user'
        }
    }],
    likedSong: [],
    repostSong: []
}, {collection: 'user'});

module.exports = userSchema;
