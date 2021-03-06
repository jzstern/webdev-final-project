module.exports = function (app) {
    app.get('/api/playlist/user/:userId', findAllPlaylistsForUser)
    app.get('/api/playlist/:playlistId', findPlaylistById)
    app.get('/api/playlists', findAllPlaylists)
    app.put('/api/playlist/:playlistId', updatePlaylist)
    app.post('/api/playlist', createPlaylistForUser)
    app.delete('/api/playlist/:playlistId', deletePlaylist)
    app.get('/api/playlist/:playlistId/songs', findAllSongsForPlaylist)

	var playlistModel = require('../models/playlist/playlist.model.server')

    function findAllSongsForPlaylist(req, res) {
        let playlistId = req.params['playlistId']
        playlistModel
            .findAllSongsForPlaylist(playlistId)
            .then(function (songs) {
                res.json(songs)
            })
    }
	function findAllPlaylists(req, res) {
		playlistModel
			.findAllPlaylists()
			.then(function (playlists) {
				res.json(playlists)
			})
	}
	function findAllPlaylistsForUser(req, res) {
		let userId = req.params['userId']
		playlistModel
			.findAllPlaylistsForUser(userId)
			.then(function (playlists) {
				res.json(playlists)
			})
	}
	function findPlaylistById(req, res) {
		let playlistId = req.params['playlistId']
		playlistModel
			.findPlaylistById(playlistId)
			.then(function (playlist) {
				res.json(playlist)
			})
	}
	function updatePlaylist(req, res) {
		let playlist = req.body;
		let playlistId = req.params['playlistId'];
		console.log(playlist);
		console.log(playlistId);
		playlistModel.updatePlaylist(playlistId, playlist)
			.then(function(error, playlist) {
				if (playlist === null) {
					res.send(error, 404)
				}
				else {
					res.send(playlist)
					console.log(playlist);
				}
			})
	}


	function createPlaylistForUser(req, res) {
		let playlist = req.body;
		playlistModel.createPlaylistForUser(playlist)
			.then(function (playlist) {
				res.send(playlist)
			})
	}

	function deletePlaylist(req, res) {
		let playlistId = req.params['playlistId'];
		playlistModel.deletePlaylist(playlistId)
			.then(function(error, song) {
				if (song === null) {
					res.send(error, 404)
				}
				else {
					res.send(song)
				}
			})

	}
}
