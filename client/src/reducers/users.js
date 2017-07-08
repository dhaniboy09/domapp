import { UPDATE_PROFILE, FETCH_USER } from '../actions/actionTypes';

const initialState = {
	isAuthenticated: false,
	users: {}
};
export default (state = initialState, action = {}) => {
	switch (action.type) {
	case UPDATE_PROFILE:
		return action.user;
	case FETCH_USER:
		return action.user;
	default: return state;
	}
};
