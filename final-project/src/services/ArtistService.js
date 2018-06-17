let _singleton = Symbol()
const URL = 'http://localhost:8080/api/artist'

class ArtistService {
	constructor(singletonToken) {
		if (_singleton !== singletonToken)
			throw new Error('Cannot instantiate directly.')
	}

	static get instance() {
		if (!this[_singleton])
			this[_singleton] = new ArtistService(_singleton)
		return this[_singleton]
	}

	findArtistById(artistId) {
		return fetch(URL + '/' + artistId)
			.then(function(response) {
				return response.json()
			})
	}

	updateArtist(artist) {
		return fetch(URL + '/' + artist.artistId, {
			body: JSON.stringify(artist),
			headers: {
				'content-type': 'application/json'
			},
			method: 'PUT'
		})
			.then(function(response) {
				return response.json()
			})
	}

	createArtist(artist) {
		return fetch(URL, {
			body: JSON.stringify(artist),
			headers: {
				'content-type': 'application/json'
			},
			method: 'POST'
		})
			.then(function (response) {
				return response.json()
			})
	}

	deleteArtist(artistId) {
		return fetch(URL + '/' + artistId, {
			method: 'DELETE'
		})
			.then(function(response) {
				return response
			})
	}
}
export default ArtistService
