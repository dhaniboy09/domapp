import { UPDATE_PROFILE, FETCH_USER, VIEW_ALL_USERS, SEARCH_USERS,
	DELETE_USER, DEACTIVATE_ACCOUNT } from '../actions/actionTypes';

const initialState = {
	isAuthenticated: false,
	users: {},
	allUsers: {},
	userSearch: {},
	pagination: []
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
		const { allUsers = [] } = state;
		const filteredUsers = allUsers.filter(user =>
			user.id !== action.userId);
		return Object.assign({}, state, { allUsers: filteredUsers });
	}
	case DEACTIVATE_ACCOUNT: {
		const { allUsers = [] } = state;
		const filteredUsers = allUsers.filter(user =>
			user.id !== action.userId);
		return Object.assign({}, state, { allUsers: filteredUsers });
	}
	case SEARCH_USERS: {
		return {
			allUsers: action.users,
			pagination: action.pagination
		};
	}
	default: return state;
	}
};
