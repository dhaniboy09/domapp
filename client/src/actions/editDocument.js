import axios from 'axios';
import { EDIT_DOCUMENT } from './actionTypes';

export const setEditDocument = (document) => {
	return {
		type: EDIT_DOCUMENT,
		document
	};
};

/**
 * @param  {object} docData
 * @return {function} dispatch
 */
export const editDocument = (docData) => {
	return dispatch => {
		return axios.put(`/api/documents/${docData.id}`, docData).then((res) => {
			console.log(res.data, 'mydata');
			dispatch(setEditDocument(res.data));
			console.log(res.data, 'edited document');
		}).catch((err) => {
			console.log(err, 'the error');
		});
	};
};
