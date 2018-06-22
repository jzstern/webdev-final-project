export function loginRequest(data) {
	return dispatch => {
		return fetch('http://localhost:4000/api/login', {
			body: JSON.stringify(data),
			headers: {
				'content-type': 'application/json'
			},
			method: 'POST'
		})
			.then(function (response) {
				return response.json()
			})
	}
}