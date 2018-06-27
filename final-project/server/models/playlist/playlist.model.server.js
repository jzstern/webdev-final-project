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
    return playlistModel.deleteOne({_id: playlistId});
}

function findAllPlaylists() {
    return playlistModel.find();
}


var api = {
    findAllPlaylistsForUser: findAllPlaylistsForUser,
    findPlaylistById: findPlaylistById,
    updatePlaylist: updatePlaylist,
    createPlaylistForUser: createPlaylistForUser,
    deletePlaylist: deletePlaylist,
    findAllPlaylists: findAllPlaylists
};

module.exports = api;