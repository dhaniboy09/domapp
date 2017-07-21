import axios from 'axios';
import { FETCH_USER } from './actionTypes';

export const setUserFetch = (user) => {
	return {
		type: FETCH_USER,
		user
	};
};

/**
 * @param  {object} id
 * @return {function} dispatch
 */
export const fetchUser = (id) => {
	return dispatch => {
		return axios.get(`/api/v1/users/${id}`).then((res) => {
			dispatch(setUserFetch(res.data));
		}).catch(() => {
			return Promise.reject();
		});
	};
};
