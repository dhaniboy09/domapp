import axios from 'axios';

/**
 * @description Sets headers that are used for authentication
 * @param {object} token
 */
export default function setAuthorizationToken(token) {
	if (token) {
		axios.defaults.headers.common['x-access-token'] = token;
	} else {
		delete axios.defaults.headers.common['x-access-token'];
	}
}
