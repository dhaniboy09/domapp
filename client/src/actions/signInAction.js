import axios from 'axios';
import jwt from 'jsonwebtoken';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import { SET_CURRENT_USER } from './actionTypes.js';

export function setCurrentUser(user) {
	return {
		type: SET_CURRENT_USER,
		user
	};
}
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
export function signout() {
	return dispatch => {
		localStorage.removeItem('token');
		setAuthorizationToken(false);
		dispatch(setCurrentUser({}));
	};
}
