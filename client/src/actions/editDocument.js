import axios from 'axios';
import { EDIT_DOCUMENT } from './actionTypes';

export const setEditDocument = (document) => {
	return {
		type: EDIT_DOCUMENT,
		document
	};
};

/**
 * @param  {object} documentData
 * @return {function} dispatch
 */
export const editDocument = (documentData) => {
	return dispatch => {
		return axios.put(`/api/v1/documents/${documentData.id}`, documentData).then((res) => {
			dispatch(setEditDocument(res.data));
			return Promise.resolve(res);
		});
	};
};
