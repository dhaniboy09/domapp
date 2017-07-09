import axios from 'axios';
import { FETCH_USER } from './actionTypes';

export const setUserFetch = (user) => {
	return {
		type: FETCH_USER,
		user
	};
};

/**
 * @param  {object} userData
 * @return {function} dispatch
 */
export const fetchUser = (id) => {
	return dispatch => {
		return axios.get(`/api/users/${id}`).then((res) => {
			console.log(res.data,'the response');
			dispatch(setUserFetch(res.data));
		}).catch((err) => {
			console.log(err, 'the error');
		});
	};
};
