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
			dispatch(searchUserDocuments(res.data.documents));
		}).catch(() => {
			return Promise.reject();
		});
	};
};
