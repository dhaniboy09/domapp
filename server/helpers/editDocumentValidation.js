import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

/**
 * @description Validates Document Update Form
 * @param  {object} formData
 * @return {object}
 */
export default function editDocumentValidation(formData) {
	const errors = {};
	if (Validator.isEmpty(formData.title)) {
		errors.title = 'Title is required';
	}
	return {
		errors,
		isValid: isEmpty(errors)
	};
}
