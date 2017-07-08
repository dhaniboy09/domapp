import axios from 'axios';
import { GET_USER_DOCUMENTS } from './actionTypes';

/**
 * @param {object} documents
 * @param  {object} pagination
 * @return {object}
 */
export const getUserDocuments = (documents, pagination) => {
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
		return axios.get(`/api/users/${params.id}/documents?offset=${params.offset}`).then((res) => {
			dispatch(getUserDocuments(res.data.documents, res.data.pagination));
		}).catch((err) => {
			console.log(err, 'user documents error');
		});
	};
};
