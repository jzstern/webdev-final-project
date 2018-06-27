var mongoose = require('mongoose');
var playlistSchema = require('./playlist.schema.server');
var playlistModel = mongoose.model('PlaylistModel', playlistSchema);


function findAllPlaylistsForUser(userId) {
    return playlistModel.find({"userId": userId});
}

function findPlaylistById(playlistId) {
    return playlistModel.findById(playlistId);
}

function updatePlaylist(playlistId, playlist) {
    return playlistModel.update({_id: playlistId},
        {$set:playlistId});
}

function createPlaylistForUser(playlist) {
    return playlistModel.create(playlist);
}

function deletePlaylist(playlistId) {
    return playlistModel.deleteOne({_id: playlistId});
}

function findAllPlaylists() {
    return playlistModel.find();
}

function findAllSongsForPlaylist(playlistId) {
    return playlistModel.find({_id: playlistId}, {songs: 1, _id: 0});
}

var api = {
    findAllPlaylistsForUser: findAllPlaylistsForUser,
    findPlaylistById: findPlaylistById,
    updatePlaylist: updatePlaylist,
    createPlaylistForUser: createPlaylistForUser,
    deletePlaylist: deletePlaylist,
    findAllPlaylists: findAllPlaylists,
    findAllSongsForPlaylist: findAllSongsForPlaylist
};

module.exports = api;