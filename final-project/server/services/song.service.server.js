module.exports = function (app) {
	app.get('/api/song', findSongs)
	app.get('/api/song/:songId', findSongById)
	app.get('/api/song/artist/:artistId', findAllSongsByArtist)
	app.post('/api/song', createSong)
	app.delete('/api/song/:songId', deleteSong)
	app.put('/api/song/:songId', updateSong)
	app.put('/api/song/like/:songId', likeSongById)
	app.put('/api/song/unlike/:songId', unlikeSongById)
	app.put('/api/song/repost/:songId', repostSongById)
	app.put('/api/song/unrepost/:songId', unrepostSongById)

	var songModel = require('../models/song/song.model.server')

	function findSongById(req, res) {
		let id = req.params['songId']
		songModel.findSongById(id)
			.then(function (song) {
				res.json(song)
			})
	}

	function likeSongById(req, res) {
		let id = req.params['songId']
		songModel.likeSongById(id)
			.then(function (song) {
				res.json(song)
			})
	}

	function unlikeSongById(req, res) {
		let id = req.params['songId']
		songModel.unlikeSongById(id)
			.then(function (song) {
				res.json(song)
			})
	}

	function repostSongById(req, res) {
		let id = req.params['songId']
		songModel.repostSongById(id)
			.then(function (song) {
				res.json(song)
			})
	}

	function unrepostSongById(req, res) {
		let id = req.params['songId']
		songModel.unrepostSongById(id)
			.then(function (song) {
				res.json(song)
			})
	}

	// function findSongsByName(req, res) {
	//     var name = req.body.title
	//     const regex = new RegExp(escapeRegex(name))
	//     // const regex = new RegExp(escapeRegex(req.query.search), 'gi')
	//     songModel
	//         .findSongsByName(regex)
	//         .then(function (songs) {
	//             res.json(songs)
	//         })
	// }

	function createSong(req, res) {
		let song = req.body
		song.stats = {
			playCount: 0,
			likeCount: 0,
			repostCount: 0
		}

		songModel.createSong(song)
			.then(function (song) {
				// req.session['currentSong'] = song
				res.send(song)
			})
	}

	function deleteSong(req, res) {
		let song = req.body
		songModel.deleteSong(song.id)
			.then(function(error, song) {
				if (song === null) {
					res.send(error, 404)
				}
				else {
					res.send(song)
				}
			})
	}

	function updateSong(req, res) {
		let song = req.body;
		console.log(song);
		songModel.updateSong(song.id, song)
			.then(function(error, song) {
				if (song === null) {
					res.send(error, 404)
				}
				else {
					res.send(song)
					console.log(song);
				}
			})
	}

	function findSongs(req, res) {
		if (req.query.title) {
			const regex = new RegExp(escapeRegex(req.query.title),'gi')
			songModel
				.findSongsByName(regex)
				.then(function (songs) {
					res.json(songs)
				})
		} else {
			songModel.findAllSongs()
				.then(function (songs) {
					res.send(songs)
				})
		}
	}

	function findAllSongsByArtist(req, res) {
		let artistId = req.params['artistId']
		songModel
			.findAllSongsByArtist(artistId)
			.then(function (songs) {
				res.json(songs);
			})
	}

	function escapeRegex(text) {
		return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
	}
}