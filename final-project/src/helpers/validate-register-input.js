// import isEmail from 'validator/lib/isEmail'
import isEmpty from 'lodash/isEmpty'

export default function validateInput(data) {
	let errors = {}

	if (data.email.length == 0) {
		errors.email = 'This field is required'
	}
	// if (!isEmail(data.email)) {
	// 	errors.email = 'Please enter a valid email'
	// }
	if (data.username.length == 0) {
		errors.username = 'This field is required'
	}
	if (data.displayName.length == 0) {
		errors.displayName = 'This field is required'
	}
	if (data.password1.length == 0) {
		errors.password1 = 'This field is required'
	}
	if (data.password2.length == 0) {
		errors.password2 = 'This field is required'
	}
	if (data.password1 !== data.password2) {
		errors.password2 = 'Passwords must match'
	}

	return {
		errors,
		isValid: isEmpty(errors)
	}
}