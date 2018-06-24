module.exports = function (app) {
    app.get('/api/song', findSongs);
    app.get('/api/song/:songId', findSongById);
    app.post('/api/song', createSong);
    app.delete('/api/song/:songId', deleteSong);
    app.post('/api/song/:songId', updateSong);
    app.post('/api/song/like/:songId', likeSongById);

    var songModel = require('../models/song/song.model.server');

    function findSongById(req, res) {
        var id = req.params['songId'];
        songModel.findSongById(id)
            .then(function (song) {
                res.json(song);
            })
    }

    function likeSongById(req, res) {
        var id = req.params['songId'];
        songModel.likeSongById(id)
            .then(function (song) {
                res.json(song);
            })
    }

    // function findSongsByName(req, res) {
    //     var name = req.body.title;
    //     const regex = new RegExp(escapeRegex(name));
    //     // const regex = new RegExp(escapeRegex(req.query.search), 'gi');
    //     songModel
    //         .findSongsByName(regex)
    //         .then(function (songs) {
    //             res.json(songs);
    //         });
    // }

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

    function findSongs(req, res) {
        if (req.query.title) {
            console.log(req.query);
            const regex = new RegExp(escapeRegex(req.query.title),'gi');
            songModel
                .findSongsByName(regex)
                .then(function (songs) {
                    res.json(songs);
                });
        } else {
            songModel.findAllSongs()
                .then(function (songs) {
                    res.send(songs);
                })
        }
    }

    function findSongsByArtist(req, res) {

    }
    function escapeRegex(text) {
        return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    }
}