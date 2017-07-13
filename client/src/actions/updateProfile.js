import axios from 'axios';
import { UPDATE_PROFILE } from './actionTypes';

/**
 * @description Set Action Type to Update Profile
 * @param  {object} user
 * @return {object}
 */
export const setUpdateProfile = (user) => {
	return {
		type: UPDATE_PROFILE,
		user
	};
};

/**
 * @param  {object} userData
 * @return {function} dispatch
 */
export const updateProfile = (userData) => {
	return dispatch => {
		return axios.put(`/api/users/${userData.id}`, userData).then((res) => {
			dispatch(setUpdateProfile(res.data));
		}).catch(() => {
			return Promise.reject();
		});
	};
};
