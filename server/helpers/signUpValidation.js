import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

/**
 * @description Validates Sign Up form
 * @param  {object} formData
 * @return {object}
 */
export default function signUpValidation(formData) {
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
	if (Validator.isEmpty(formData.password)) {
		errors.password = 'Password is Required';
	}
	if (Validator.isEmpty(formData.passwordConfirm)) {
		errors.passwordConfirm = 'Password Confirmation is Required';
	}
	if (!Validator.equals(formData.password, formData.passwordConfirm)) {
		errors.passwordConfirm = 'Passwords must match';
	}
	if (!Validator.isLength(formData.password, { min: 6, max: 100 })) {
		errors.password = 'Password must be minimum of 6 characters';
	}
	return {
		errors,
		isValid: isEmpty(errors)
	};
}
