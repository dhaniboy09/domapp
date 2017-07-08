import { combineReducers } from 'redux';
import auth from './reducers/auth';
import users from './reducers/users';
import userDocuments from './reducers/userDocuments';

export default combineReducers({
	auth,
	users,
	userDocuments
});
