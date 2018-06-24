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

function findSongsByName(songName) {
    return songModel.find({"title": songName});
    // return songModel.findOne({title: songName});
}

function likeSongById(songId) {
    return songModel.update(
        {_id: songId},
        { $inc: {"stats.likeCount": 1}});
}
function unlikeSongById(songId) {
    return songModel.update(
        {_id: songId},
        { $inc: {"stats.likeCount": -1}});
}

function repostSongById(songId) {
    return songModel.update(
    {_id: songId},
    { $inc: {"stats.repostCount": 1}});
}




var api = {
    createSong: createSong,
    findAllSongs: findAllSongs,
    findSongById: findSongById,
    deleteSong: deleteSong,
    updateSong: updateSong,
    findSongsByName: findSongsByName,
    likeSongById: likeSongById,
    repostSongById: repostSongById,
    unlikeSongById: unlikeSongById

};

module.exports = api;