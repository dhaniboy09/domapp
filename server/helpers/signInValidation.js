import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

/**
 * @description Validates Sign In form
 * @param  {object} formData
 * @return {object}
 */
export default function signInValidation(formData) {
	const errors = {};
	if (Validator.isEmpty(formData.email)) {
		errors.email = 'Email is required';
	}
	if (!Validator.isEmail(formData.email)) {
		errors.email = 'Email is invalid';
	}
	if (Validator.isEmpty(formData.password)) {
		errors.password = 'Password is required';
	}
	return {
		errors,
		isValid: isEmpty(errors)
	};
}
