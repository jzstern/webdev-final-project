module.exports = function (app) {
    app.get('/api/song', findAllSongs);
    app.get('/api/song/:songId', findSongById);
    app.post('/api/song', createSong);

    var songModel = require('../models/song/song.model.server');

    function findSongById(req, res) {
        var id = req.params['songId'];
        songModel.findSongById(id)
            .then(function (song) {
                res.json(song);
            })
    }

    function createSong(req, res) {
        var song = req.body;
        songModel.createSong(song)
            .then(function (song) {
                req.session['currentSong'] = song;
                res.send(song);
            })
    }

    function findAllSongs(req, res) {
        songModel.findAllSongs()
            .then(function (songs) {
                res.send(songs);
            })
    }
}