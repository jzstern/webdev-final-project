import isEmpty from "lodash/isEmpty";

export default function validateInput(data) {
	let errors = {}

	if (data.songTitle.length == 0) {
		errors.songTitle = 'This field is required'
	}
	if (data.albumArtUrl.length == 0) {
		errors.albumArtUrl = 'This field is required'
	}

	console.log(errors)
	return {
		errors,
		isValid: isEmpty(errors)
	}
}