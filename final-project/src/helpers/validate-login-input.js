import isEmpty from 'lodash/isEmpty'

export default function validateInput(data) {
	let errors = {}

	if (data.username.length == 0) {
		errors.username = 'Please enter your username'
	}
	if (data.password.length == 0) {
		errors.password = 'Please enter your password'
	}

	return {
		errors,
		isValid: isEmpty(errors)
	}
}