import axios from 'axios';
import { VIEW_ALL_DOCUMENTS } from './actionTypes';

/**
 * @description Dispatches action to view all documents
 * @param  {object} documents
 * @param  {object} pagination
 * @return {object}
 */
export const getAllDocuments = (documents, pagination) => {
	return {
		type: VIEW_ALL_DOCUMENTS,
		documents,
		pagination
	};
};

/**
 * @param  {object} params
 * @return {function} dispatch
 */
export const allDocuments = (params) => {
	return dispatch => {
		return axios.get(`/api/documents/?offset=${params.offset}`).then((res) => {
			dispatch(getAllDocuments(res.data.documents, res.data.pagination));
			// dispatch(getAllDocuments);
		}).catch((err) => {
			console.log(err, 'the error');
		});
	};
};
