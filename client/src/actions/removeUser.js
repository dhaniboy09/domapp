import axios from 'axios';
import { DELETE_USER } from './actionTypes';

export const setRemoveUser = (userId) => {
	return {
		type: DELETE_USER,
		userId
	};
};
/**
 * @param  {object} userData
 * @return {function} dispatch
 */
export const removeUser = (userId) => {
	return dispatch => {
		return axios.delete(`/api/users/${userId}`).then((res) => {
			dispatch(setRemoveUser(userId));
			console.log(res.data, 'deleted document');
		}).catch((err) => {
			console.log(JSON.stringify(err), 'the error');
		});
	};
};
