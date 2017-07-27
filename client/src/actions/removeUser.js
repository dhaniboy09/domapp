import axios from 'axios';
import { DELETE_USER } from './actionTypes';

export const setRemoveUser = (userId) => {
	return {
		type: DELETE_USER,
		userId
	};
};
/**
 * @param  {object} userId
 * @return {function} dispatch
 */
export const removeUser = (userId) => {
	return dispatch => {
		return axios.delete(`/api/v1/users/${userId}`).then((res) => {
			dispatch(setRemoveUser(userId));
			return Promise.resolve(res);
		});
	};
};
