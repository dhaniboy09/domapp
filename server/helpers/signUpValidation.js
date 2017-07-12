import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateInput(data) {
	let errors = {};
	if (Validator.isEmpty(data.firstName)) {
		errors.firstName = 'First Name is Required';
	}
	if (Validator.isEmpty(data.lastName)) {
		errors.lastName = 'Last Name is Required';
	}
	if (Validator.isEmpty(data.email)) {
		errors.email = 'Email is Required';
	}
	if (!Validator.isEmail(data.email)) {
		errors.email = 'Email is invalid';
	}
	if (Validator.isEmpty(data.password)) {
		errors.password = 'Password is Required';
	}
	if (Validator.isEmpty(data.passwordConfirm)) {
		errors.passwordConfirm = 'Password Confirmation is Required';
	}
	if (!Validator.equals(data.password, data.passwordConfirm)) {
		errors.passwordConfirm = 'Passwords must match';
	}
	if (!Validator.isLength(data.password, { min: 6, max: 100 })) {
		errors.password = 'Password must be minimum of 6 characters';
	}
	return {
		errors,
		isValid: isEmpty(errors)
	};
}
