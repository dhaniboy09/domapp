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
		return axios.put(`/api/documents/${documentData.id}`, documentData).then((res) => {
			console.log(res.data, 'mydata');
			dispatch(setEditDocument(res.data));
			console.log(res.data, 'edited document');
		}).catch((err) => {
			console.log(err, 'the error');
		});
	};
};
