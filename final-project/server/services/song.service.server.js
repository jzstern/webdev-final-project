module.exports = function (app) {
    app.get('/api/song', findAllSongs);
    app.get('/api/song/:songId', findSongById);
    app.get('/api/song/:songName', findSongByName);
    app.post('/api/song', createSong);
    app.delete('/api/song/:songId', deleteSong);
    app.post('/api/song/:songId', updateSong);

    var songModel = require('../models/song/song.model.server');

    function findSongById(req, res) {
        var id = req.params['songId'];
        songModel.findSongById(id)
            .then(function (song) {
                res.json(song);
            })
    }

    function findSongByName(title) {
        return songModel.findOne({title: title},
            function(err, title) {
                if (err) throw error;
                console.log("cannot find song by name");
                console.log(title);
            })
    }

    function createSong(req, res) {
        let song = req.body;
        let stats = {
	        playCount: 0,
	        likeCount: 0,
	        repostCount: 0
        }

        song.stats = stats;

        console.log(song);

        songModel.createSong(song)
            .then(function (song) {
                req.session['currentSong'] = song;
                res.send(song);
            })
    }

    function deleteSong(req, res) {
        var song = req.body;
        songModel.deleteSong(song.id)
            .then(function(error, song) {
                if (song == null) {
                    res.send(error, 404);
                }
                else {
                    res.send(song);
                }
            })
    }

    function updateSong(req, res) {
        var song = req.body;
        songModel.updateSong(song.id, song)
            .then(function(error, song) {
                if (song == null) {
                    res.send(error, 404);
                }
                else {
                    res.send(song);
                }
            })
    }
    function findAllSongs(req, res) {
        songModel.findAllSongs()
            .then(function (songs) {
                res.send(songs);
            })
    }

    function findSongsByArtist(req, res) {

    }
}