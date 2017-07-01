import axios from 'axios';
import { VIEW_ALL_DOCUMENTS } from './actionTypes';

export const getAllDocuments = (documents) => {
	return {
		type: VIEW_ALL_DOCUMENTS,
		documents
	};
};

/**
 * @param  {object} docData
 * @return {function} dispatch
 */
export const allDocuments = () => {
	return dispatch => {
		return axios.get('/api/documents').then((res) => {
			dispatch(getAllDocuments(res.data.documents));
		}).catch((err) => {
			console.log(err, 'the error');
		});
	};
};
