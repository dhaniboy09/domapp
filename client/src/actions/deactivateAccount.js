import axios from 'axios';
import { DEACTIVATE_ACCOUNT } from './actionTypes';

export const setDeactivateUser = (userId) => {
	return {
		type: DEACTIVATE_ACCOUNT,
		userId
	};
};
/**
 * @param  {object} userId
 * @return {function} dispatch
 */
export const deactivateAccount = (userId) => {
	return dispatch => {
		return axios.delete(`/api/v1/users/${userId}`).then((res) => {
			dispatch(setDeactivateUser(userId));
			return Promise.resolve(res);
		});
	};
};
