var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var playlistSchema = mongoose.Schema({
    name: String,
    userId: String,
    songs: [String]
}, {collection: 'playlist'});

module.exports = playlistSchema;
