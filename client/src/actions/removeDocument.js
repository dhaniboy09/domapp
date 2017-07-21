import axios from 'axios';
import { DELETE_DOCUMENT } from './actionTypes';

export const setRemoveDocument = (documentId) => {
	return {
		type: DELETE_DOCUMENT,
		documentId
	};
};

/**
 * @param  {object} documentId
 * @return {function} dispatch
 */
export const removeDocument = (documentId) => {
	return dispatch => {
		return axios.delete(`/api/v1/documents/${documentId}`).then((res) => {
			dispatch(setRemoveDocument(documentId));
			return Promise.resolve(res);
		});
	};
};
