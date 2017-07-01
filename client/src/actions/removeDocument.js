import axios from 'axios';
import { DELETE_DOCUMENT } from './actionTypes';

export const setRemoveDocument = (document) => {
	return {
		type: DELETE_DOCUMENT,
		document
	};
};

/**
 * @param  {object} docData
 * @return {function} dispatch
 */
export const removeDocument = (documentId) => {
	return dispatch => {
		return axios.delete(`/api/documents/${documentId}`).then((res) => {
			dispatch(setRemoveDocument(res.data.foundDocument));
			console.log(res.data, 'deleted document');
		}).catch((err) => {
			console.log(JSON.stringify(err), 'the error');
		});
	};
};
