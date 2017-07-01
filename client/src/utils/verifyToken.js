export default function isValidToken() {
	if (localStorage.getItem('token')) {
		return true;
	}
	return false;
}
