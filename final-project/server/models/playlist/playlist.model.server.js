var mongoose = require('mongoose');
var playlistSchema = require('./playlist.schema.server');
var playlistModel = mongoose.model('PlaylistModel', playlistSchema);
var Schema = mongoose.Schema;


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
    return playlistMode.deleteOne({_id: playlistId});
}


var api = {
    findAllPlaylistsForUser: findAllPlaylistsForUser,
    findPlaylistById: findPlaylistById,
    updatePlaylist: updatePlaylist,
    createPlaylistForUser: createPlaylistForUser,
    deletePlaylist: deletePlaylist
};

module.exports = api;