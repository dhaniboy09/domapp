import { combineReducers } from 'redux';
import auth from './reducers/auth';
import users from './reducers/users';
import documents from './reducers/documents';

export default combineReducers({
	auth,
	users,
	documents
});
