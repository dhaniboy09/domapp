import axios from 'axios';
import { GET_USER_DOCUMENTS } from './actionTypes';

/**
 * @param {object} documents
 * @param  {object} pagination
 * @return {object}
 */
export const UserDocuments = (documents, pagination) => {
	return {
		type: GET_USER_DOCUMENTS,
		documents,
		pagination
	};
};

/**
 * @param  {object} params
 * @return {function} dispatch
 */
export const myDocuments = (params) => {
	return dispatch => {
		return axios.get(`/api/v1/users/${params.id}/documents?offset=${params.offset}`).then((res) => {
			dispatch(UserDocuments(res.data.documents, res.data.pagination));
		}).catch(() => {
			return Promise.reject();
		});
	};
};
