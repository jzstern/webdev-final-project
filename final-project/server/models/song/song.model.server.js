var mongoose = require('mongoose');
var songSchema = require('./song.schema.server');
var songModel = mongoose.model('SongModel', songSchema);

function findSongById(songId) {
    return songModel.findById(songId);
}

function createSong(song) {
    return songModel.create(song);
}
function deleteSong(songId) {
    return songModel.remove({_id:songId});
}

function updateSong(songId, newSong) {
    return songModel.update({_id: songId}, {$set:newSong});
}

function findAllSongs() {
    return songModel.find();
}


var api = {
    createSong: createSong,
    findAllSongs: findAllSongs,
    findSongById: findSongById,
    deleteSong: deleteSong,
    updateSong: updateSong

};

module.exports = api;