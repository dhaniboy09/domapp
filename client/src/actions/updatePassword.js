import axios from 'axios';
import { UPDATE_PASSWORD } from './actionTypes';

/**
 * @description Set Action Type to Update password
 * @param  {string} password
 * @return {object}
 */
export const setUpdatePassword = (password) => {
	return {
		type: UPDATE_PASSWORD,
		password
	};
};
/**
 * @param  {object} userData
 * @return {function} dispatch
 */
export const updatePassword = (userData) => {
	return dispatch => {
		return axios.put(`/api/users/profile/${userData.id}`, userData).then((res) => {
			dispatch(setUpdatePassword(res.data));
		}).catch(() => {
			return Promise.reject();
		});
	};
};
