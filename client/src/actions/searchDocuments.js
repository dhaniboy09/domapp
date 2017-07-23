import axios from 'axios';
import { SEARCH_DOCUMENTS } from './actionTypes';

/**
 * @param  {object} documents
 * @param  {object} pagination
 * @return {object}
 */
export const searchUserDocuments = (documents, pagination) => {
	return {
		type: SEARCH_DOCUMENTS,
		documents,
		pagination
	};
};

/**
 * @param  {object} [params]
 * @return {function} dispatch
 */
export const searchDocuments = (params) => {
	return dispatch => {
		return axios.get(`/api/v1/search/documents?query=${params.searchQuery}&offset=${params.offset}`).then((res) => {
			dispatch(searchUserDocuments(res.data.documents, res.data.pagination));
			return Promise.resolve(res);
		});
	};
};
