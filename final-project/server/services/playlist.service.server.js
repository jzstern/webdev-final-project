module.exports = function (app) {

    var playlistMode = require('../models/playlist/playlist.model.server')

    app.get('http://localhost:4000/api/playlist/user/:userId', findAllPlaylistsForUser)
    app.get('http://localhost:4000/api/playlist/:playlistId', findPlaylistById)
    app.put('http://localhost:4000/api/playlist/:playlistId', updatePlaylist)
    app.post('http://localhost:4000/api/playlist', createPlaylistForUser)
    app.delete('http://localhost:4000/api/playlist/:playlistId', deletePlaylist)

    function findAllPlaylistsForUser(req, res) {

    }
    function findPlaylistById(req, res) {

    }
    function updatePlaylist(req, res) {

    }
    function createPlaylistForUser(req, res) {

    }
    function deletePlaylist(req, res) {

    }



}