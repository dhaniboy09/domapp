import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

/**
 * @description Validates Profile Update form
 * @param  {object} formData
 * @return {object}
 */
export default function editProfileValidation(formData) {
	const errors = {};
	if (Validator.isEmpty(formData.firstName)) {
		errors.firstName = 'First Name is Required';
	}
	if (Validator.isEmpty(formData.lastName)) {
		errors.lastName = 'Last Name is Required';
	}
	if (Validator.isEmpty(formData.email)) {
		errors.email = 'Email is Required';
	}
	if (!Validator.isEmail(formData.email)) {
		errors.email = 'Email is invalid';
	}
	return {
		errors,
		isValid: isEmpty(errors)
	};
}
