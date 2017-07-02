import axios from 'axios';
import { SEARCH_DOCUMENTS } from './actionTypes';

/**
 * @param  {object} documents
 * @return {object}
 */
export const searchUserDocuments = (documents) => {
	return {
		type: SEARCH_DOCUMENTS,
		documents
	};
};

/**
 * @param  {string} searchQuery
 * @return {function} dispatch
 */
export const searchDocuments = (searchQuery) => {
	return dispatch => {
		return axios.get(`/api/search/documents/${searchQuery}`).then((res) => {
			console.log(res, 'from the action');
			dispatch(searchUserDocuments(res.data.documents));
		}).catch((err) => {
			console.log(err, 'user documents error');
		});
	};
};
