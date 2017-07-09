import axios from 'axios';
import { UPDATE_PASSWORD } from './actionTypes';

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
		}).catch((err) => {
			console.log(err, 'the error');
		});
	};
};
