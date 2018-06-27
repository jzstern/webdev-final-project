let _singleton = Symbol()
const URL = 'http://localhost:4000/api/playlist'

class PlaylistService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.')
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new PlaylistService(_singleton)
        return this[_singleton]
    }

    findAllPlaylistsForUser(userId) {
        return fetch(URL + '/user/' + userId)
            .then(function(response) {
                console.log(response)
                return response ? response.json() : {}
            })
    }

    findAllSongs(playlistId) {
        return fetch(URL + '/' + playlistId + "/songs")
            .then(function(response) {
                return response.json()
            })
	}

    findPlaylistById(playlistId) {
        return fetch(URL + '/' + playlistId)
            .then(function(response) {
                return response.json()
            })
    }

    updatePlaylist(playlist) {
        return fetch(URL + '/' + playlist._id, {
            body: JSON.stringify(playlist),
            headers: {
                'content-type': 'application/json'
            },
            method: 'PUT'
        })
            .then(function(response) {
                return response.json()
            })
    }

    createPlaylistForUser() {
        let user = JSON.parse(localStorage.getItem('user'))
        let playlist =  {
            userId: user
        }

        return fetch(URL, {
            body: JSON.stringify(playlist),
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST'
        }).then(function (response) {
            return response.json()
        })
    }

    deletePlaylist(playlistId) {
        return fetch(URL + '/' + playlistId, {
            method: 'DELETE'
        })
            .then(function(response) {
                return response
            })
    }
}
export default PlaylistService
