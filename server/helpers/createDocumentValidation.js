import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

/**
 * @description Validates form for creating new documents
 * @param  {object} formData
 * @return {object}
 */
export default function createDocumentValidation(formData) {
	const errors = {};
	if (Validator.isEmpty(formData.title)) {
		errors.title = 'Title is required';
	}
	if (Validator.isEmpty(formData.content)) {
		errors.content = 'Content is required';
	}
	return {
		errors,
		isValid: isEmpty(errors)
	};
}
