let _singleton = Symbol()
const URL = 'http://localhost:4000/api/song'

class SongService {
	constructor(singletonToken) {
		if (_singleton !== singletonToken)
			throw new Error('Cannot instantiate directly.')
	}

	static get instance() {
		if (!this[_singleton])
			this[_singleton] = new SongService(_singleton)
		return this[_singleton]
	}

	// find all songs for the current user
	findAllSongs() {
		return fetch(URL)
			.then(function(response) {
				return response.json()
			})
	}

	findSongById(songId) {
		return fetch(URL + '/' + songId)
			.then(function(response) {
				return response.json()
			})
	}

    findSongsByName(songName) {
		// var song = {"title": songName};
		return fetch(URL + "?title=" +songName)
			.then(function(response) {
				return response.json()
            })
    }

	updateSong(song) {
		return fetch(URL + '/' + song.songId, {
			body: JSON.stringify(song),
			headers: {
				'content-type': 'application/json'
			},
			method: 'PUT'
		})
			.then(function(response) {
				return response.json()
			})
	}

	createSong(song) {
		return fetch(URL, {
			body: JSON.stringify(song),
			headers: {
				'content-type': 'application/json'
			},
			method: 'POST'
		})
			.then(function (response) {
				return response.json()
			})
	}

	deleteSong(songId) {
		return fetch(URL + '/' + songId, {
			method: 'DELETE'
		})
			.then(function(response) {
				return response
			})
	}
}
export default SongService
