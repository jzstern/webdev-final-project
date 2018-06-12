var mongoose = require('mongoose');

var songSchema = mongoose.Schema({
    title: String,
    artist: String,
    likes: Number,
    img: String,
    url: String
}, {collection: 'song'});

module.exports = songSchema;