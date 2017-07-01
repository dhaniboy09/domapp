import axios from 'axios';
import { GET_USER_DOCUMENTS } from './actionTypes';

/**
 * @param  {object} documents
 * @return {object}
 */
export const getUserDocuments = (documents) => {
	return {
		type: GET_USER_DOCUMENTS,
		documents
	};
};

/**
 * @param  {object} id
 * @return {function} dispatch
 */
export const myDocuments = (id) => {
	return dispatch => {
		return axios.get(`/api/users/${id}/documents`).then((res) => {
			dispatch(getUserDocuments(res.data.documents));
		}).catch((err) => {
			console.log(err, 'user documents error');
		});
	};
};
