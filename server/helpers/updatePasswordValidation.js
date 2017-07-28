import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

/**
 * @description Validates Password Update form
 * @param  {object} formData
 * @return {object}
 */
export default function updatePasswordValidation(formData) {
	const errors = {};
	if (Validator.isEmpty(formData.password)) {
		errors.password = 'Password is Required';
	}
	if (Validator.isEmpty(formData.passwordConfirm)) {
		errors.passwordConfirm = 'Password Confirmation is Required';
	}
	if (!Validator.equals(formData.password, formData.passwordConfirm)) {
		errors.passwordConfirm = 'Passwords must match';
	}
	return {
		errors,
		isValid: isEmpty(errors)
	};
}
