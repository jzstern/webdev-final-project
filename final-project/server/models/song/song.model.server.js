var mongoose = require('mongoose');
var songSchema = require('./song.schema.server');
var songModel = mongoose.model('SongModel', songSchema);

function findSongById(songId) {
    return songModel.findById(songId);
}

function createSong(song) {
    return songModel.create(song);
}

function findAllSongs() {
    return songModel.find();
}

var api = {
    createSong: createSong,
    findAllSongs: findAllSongs,
    findSongById: findSongById
};

module.exports = api;