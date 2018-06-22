import isEmpty from "lodash/isEmpty";

export default function validateInput(data) {
	let errors = {}

	if (data.title.length == 0) {
		errors.title = 'This field is required'
	}
	if (data.imgUrl.length == 0) {
		errors.imgUrl = 'This field is required'
	}

	console.log(errors)
	return {
		errors,
		isValid: isEmpty(errors)
	}
}