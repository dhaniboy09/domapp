import { combineReducers } from 'redux';
import auth from './reducers/auth';
import userDocuments from './reducers/userDocuments';

export default combineReducers({
	auth,
	userDocuments
});
