import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../rootReducer';

/**
 * @description Configuration for Redux Store
 * @return {object}
 */
const configureStore = () => {
	const store = createStore(
		rootReducer,
		compose(
			applyMiddleware(thunk),
			window.devToolsExtension ? window.devToolsExtension() : f => f
		)
	);
	return store;
};
export default configureStore;
