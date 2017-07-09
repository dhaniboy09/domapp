import React from 'react';
import { render } from 'react-dom';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'babel-polyfill';
import thunk from 'redux-thunk';
import jwt from 'jsonwebtoken';
import App from './src/components/App';
import Home from './src/components/Home';
import SignInPage from './src/components/SignInPage';
import Documents from './src/components/Documents';
import MyDocuments from './src/components/MyDocuments';
import SearchResults from './src/components/SearchResults';
import Settings from './src/components/Settings';
import AllUsers from './src/components/AllUsers';
import setAuthorizationToken from './src/utils/setAuthorizationToken';
import rootReducer from './src/rootReducer';
import { setCurrentUser } from './src/actions/signInAction';
import './src/public/css/styles.scss';

const history = createBrowserHistory();
const store = createStore(
	rootReducer,
	compose(
		applyMiddleware(thunk),
		window.devToolsExtension ? window.devToolsExtension() : f => f
	)
);
if (localStorage.token) {
	setAuthorizationToken(localStorage.token);
	store.dispatch(setCurrentUser(jwt.decode(localStorage.token)));
}
/**
 * @description Checks if user is authenticated
 * @return {Boolean}
 */
function isAuthenticated() {
	if (localStorage.getItem('token')) {
		return true;
	}
	return false;
}

render(
	<Provider store={store}>
		<Router history={history}>
			<App>
				<Switch>
					<Route
						exact
						path="/"
						render={() => (
							isAuthenticated() ? (<Documents />) : (<Home />)
						)}
					/>
					<Route
						exact
						path="/signin"
						render={() => (
							isAuthenticated() ? (<Documents />) : (<SignInPage />)
						)}
					/>
					<Route
						exact
						path="/documents"
						render={() => (
							isAuthenticated() ? (<Documents />) : (<Home />)
						)}
					/>
					<Route
						exact
						path="/mydocuments"
						render={() => (
							isAuthenticated() ? (<MyDocuments />) : (<Home />)
						)}
					/>
					<Route
						exact
						path="/searchresults"
						render={() => (
							isAuthenticated() ? (<SearchResults />) : (<Home />)
						)}
					/>
					<Route
						exact
						path="/allusers"
						render={() => (
							isAuthenticated() ? (<AllUsers />) : (<Home />)
						)}
					/>
					<Route
						exact
						path="/settings"
						render={() => (
							isAuthenticated() ? (<Settings />) : (<Home />)
						)}
					/>
				</Switch>
			</App>
		</Router>
	</Provider>
	, document.getElementById('app')
);
