import axios from 'axios';
import { SEARCH_USERS } from './actionTypes';

/**
 * @param  {object} users
 * @param  {object} pagination
 * @return {object}
 */
export const setSearchUsers = (users, pagination) => {
	return {
		type: SEARCH_USERS,
		users,
		pagination
	};
};

/**
 * @param  {object} [params]
 * @return {function} dispatch
 */
export const searchUsers = (params) => {
	return dispatch => {
		return axios.get(`/api/v1/search/users?query=${params.searchQuery}&offset=${params.offset}&limit=${params.limit}`).then((res) => {
			dispatch(setSearchUsers(res.data.users, res.data.pagination));
		}).catch(() => {
			return Promise.reject();
		});
	};
};
