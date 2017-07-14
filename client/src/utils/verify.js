import jwtdecode from 'jwt-decode';

/**
 * @description Checks if user is authenticated
 * @return {Boolean}
 */
export function isAuthenticated() {
	if (localStorage.getItem('token')) {
		return true;
	}
	return false;
}
/**
 * @description Check if user is an Admin
 * @return {Boolean}
 */
export function isAdmin() {
	const decoded = jwtdecode(localStorage.getItem('token'));
	if (decoded.roleId === 1) {
		return true;
	}
	return false;
}
