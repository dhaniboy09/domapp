import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

/**
 * @description Performs Client Side Validation
 * @param  {object} data Data to be Validated
 * @return {object}
 */
export default function validateInput(data) {
	let errors = {};
	if (Validator.isEmpty(data.title)) {
		errors.title = 'Title is required';
	}
	if (Validator.isEmpty(data.content)) {
		errors.content = 'Content is required';
	}
	return {
		errors,
		isValid: isEmpty(errors)
	};
}
