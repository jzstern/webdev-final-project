var mongoose = require('mongoose');

var songSchema = mongoose.Schema({
    title: String,
    artist: String,
    description: String,
    likes: Number,
    imgUrl: String,
    songUrl: String,
    stats: {
        playCount: Number,
        likeCount: Number,
        repostCount: Number
    },
    genre: String
}, {collection: 'song'});

module.exports = songSchema;