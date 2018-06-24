let _singleton = Symbol()
const LOCAL_URL = 'http://localhost:4000/api/'
// const PROD_URL = 'http://localhost:8080/api/'

class UserService {
	constructor(singletonToken) {
		if (_singleton !== singletonToken)
			throw new Error('Cannot instantiate directly.')
	}

	static get instance() {
		if (!this[_singleton])
			this[_singleton] = new UserService(_singleton)
		return this[_singleton]
	}

	fetchUser() {
		return fetch(LOCAL_URL + 'profile', {
			headers: {
				'Content-Type': 'application/json'
			},
			method: 'GET'
		})
			.then(function(response) {
				if (response.status === 406) {
					return false
				} else {
					return response.json()
				}
			})
	}

	login(user) {
		return fetch(LOCAL_URL + 'login', {
			body: JSON.stringify(user),
			headers: {
				'Content-Type': 'application/json'
			},
			method: 'POST'
		})
			.then(response => {
				if (response.status === 404) {
					alert('Login credentials incorrect')
				} else {
					// TODO ; set the this.state.user object to user on app.js and re-render components
					return response.json()
				}
			})
	}

	findUserById(userId) {
		return fetch(LOCAL_URL + 'user/' + userId)
			.then(function(response) {
				return response.json()
			})
	}

	findUserByUsername(username) {
		return fetch(LOCAL_URL + '/' + username)
			.then(function(response) {
				return response.json()
			})
	}

	updateUser(user) {
		return fetch(LOCAL_URL + 'user/' + user._id, {
			body: JSON.stringify(user),
			headers: {
				'content-type': 'application/json'
			},
			method: 'PUT'
		})
			.then(response => {
				return response.json()
			})
	}

	createUser(user) {
		return fetch(LOCAL_URL + 'user', {
			body: JSON.stringify(user),
			headers: {
				'content-type': 'application/json'
			},
			method: 'POST'
		})
			.then(function (response) {
				return response.json()
			})
	}

	deleteUser(userId) {
		return fetch(LOCAL_URL + 'user/' + userId, {
			method: 'DELETE'
		})
			.then(function(response) {
				return response
			})
	}
}
export default UserService
