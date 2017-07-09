import { UPDATE_PROFILE, FETCH_USER, VIEW_ALL_USERS, DELETE_USER, DEACTIVATE_ACCOUNT } from '../actions/actionTypes';

const initialState = {
	isAuthenticated: false,
	users: {},
	allUsers: {}
};
export default (state = initialState, action = {}) => {
	switch (action.type) {
	case UPDATE_PROFILE:
		return action.user;
	case FETCH_USER:
		return action.user;
	case VIEW_ALL_USERS:
		return Object.assign({}, state, { allUsers: action.users, pagination: action.pagination });
	case DELETE_USER: {
		const filteredUsers = state.allUsers.filter(user =>
			user.id !== action.userId);
		return Object.assign({}, state, { allUsers: filteredUsers });
	}
	case DEACTIVATE_ACCOUNT: {
		const filteredUsers = state.allUsers.filter(user =>
			user.id !== action.userId);
		return Object.assign({}, state, { allUsers: filteredUsers });
	}
	default: return state;
	}
};
