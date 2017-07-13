import axios from 'axios';
import jwt from 'jsonwebtoken';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import { SET_CURRENT_USER } from './actionTypes';

/**
 * @description Sets the logged in user
 * @param {object} user
 * @returns {void}
 */
export function setCurrentUser(user) {
	return {
		type: SET_CURRENT_USER,
		user
	};
}
/**
 * @description Signs user in
 * @param {object} data
 * @returns {object}
 */
export function signin(data) {
	return dispatch => {
		return axios.post('auth/users/login', data).then((res) => {
			const token = res.data.token;
			localStorage.setItem('token', token);
			setAuthorizationToken(token);
			dispatch(setCurrentUser(jwt.decode(token)));
		});
	};
}
/**
 * @description Logs use out 
 * @returns {object}
 */
export function signout() {
	return dispatch => {
		localStorage.removeItem('token');
		setAuthorizationToken(false);
		dispatch(setCurrentUser({}));
	};
}
