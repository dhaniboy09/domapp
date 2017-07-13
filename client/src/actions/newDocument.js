import axios from 'axios';
import { CREATE_NEW_DOCUMENT } from './actionTypes';

export const setNewDocument = (document) => {
	return {
		type: CREATE_NEW_DOCUMENT,
		document
	};
};

/**
 * @param  {object} docData
 * @return {function} dispatch
 */
export const newDocument = (docData) => {
	return dispatch => {
		return axios.post('/api/documents', docData).then((res) => {
			dispatch(setNewDocument(res.data.createdDocument));
		}).catch(() => {
			return Promise.reject();
		});
	};
};

