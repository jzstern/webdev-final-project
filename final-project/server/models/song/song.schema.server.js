var mongoose = require('mongoose');

// TODO ; update so that it matches object format from client

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