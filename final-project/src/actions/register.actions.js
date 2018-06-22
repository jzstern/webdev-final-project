// import * as constants from '../constants/constants';
import { UserService } from '../services/user.service.client';

export function userRegistrationRequest(user) {
	// return dispatch => {
	// 	return UserService.createUser(user)
	//
	// 	// dispatch(request(user));
	// 	//
	// 	// userService.register(user)
	// 	// 	.then(
	// 	// 		user => {
	// 	// 			dispatch(success());
	// 	// 			history.push('/login');
	// 	// 			dispatch(alertActions.success('Registration successful'));
	// 	// 		},
	// 	// 		error => {
	// 	// 			dispatch(failure(error));
	// 	// 			dispatch(alertActions.error(error));
	// 	// 		}
	// 	// 	);
	// }

	console.log('ABOUT TO MAKE API WOOHOO')
	console.log(user)

	return fetch('http://localhost:8080/api/user', {
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