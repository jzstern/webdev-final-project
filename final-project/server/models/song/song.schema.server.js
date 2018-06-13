var mongoose = require('mongoose');

var songSchema = mongoose.Schema({
    title: String,
    artist: String,
    likes: Number,
    img: String,
    url: String,
    stats: {
        numberPlayed: Number,
        numberLiked: Number,
        numberShared: Number
    },
    genre: String
}, {collection: 'song'});

module.exports = songSchema;