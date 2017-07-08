import axios from 'axios';
import jwt from 'jsonwebtoken';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import { CREATE_USER } from './actionTypes';

export function createUser(user) {
	return {
		type: CREATE_USER,
		user
	};
}

export function userSignUpRequest(userData) {
	return dispatch => {
		return axios.post('/auth/users', userData).then((res) => {
			const token = res.data.token;
			localStorage.setItem('token', token);
			setAuthorizationToken(token);
			dispatch(createUser(jwt.decode(token)));
		});
	};
}
