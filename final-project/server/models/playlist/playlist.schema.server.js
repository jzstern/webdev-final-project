var mongoose = require('mongoose');

var playlistSchema = mongoose.Schema({
    name: String,
    userId: String,
    songs: [String]
}, {collection: 'playlist'});

module.exports = playlistSchema;

