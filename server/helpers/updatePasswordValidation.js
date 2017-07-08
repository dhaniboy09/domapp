import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateInput(data) {
	let errors = {};
	if (Validator.isEmpty(data.password)) {
		errors.password = 'Password is Required';
	}
	if (Validator.isEmpty(data.passwordConfirm)) {
		errors.passwordConfirm = 'Password Confirmation is Required';
	}
	if (!Validator.equals(data.password, data.passwordConfirm)) {
		errors.passwordConfirm = 'Passwords must match';
	}
	return {
		errors,
		isValid: isEmpty(errors)
	};
}
