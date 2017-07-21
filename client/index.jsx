import React from 'react';
import { render } from 'react-dom';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import { Redirect, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { isAuthenticated, isAdmin } from './src/utils/verify';
import configureStore from './src/utils/configureStore';
import App from './src/components/App';
import Home from './src/components/Home';
import SignInPage from './src/components/SignInPage';
import Documents from './src/components/Documents';
import Search from './src/components/Search';
import MyDocuments from './src/components/MyDocuments';
import SearchResults from './src/components/SearchResults';
import Settings from './src/components/Settings';
import AllUsers from './src/components/AllUsers';
import DocumentDetails from './src/components/DocumentDetails';
import setAuthorizationToken from './src/utils/setAuthorizationToken';
import { setCurrentUser } from './src/actions/signInAction';
import './src/public/css/styles.scss';


const history = createBrowserHistory();
const store = configureStore();

if (localStorage.token) {
	setAuthorizationToken(localStorage.token);
	store.dispatch(setCurrentUser(jwt.decode(localStorage.token)));
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
							isAuthenticated() ? (<Redirect to="/mydocuments" />) : (<Home />)
						)}
					/>
					<Route
						exact
						path="/signin"
						render={() => (
							isAuthenticated() ? (<Redirect to="/mydocuments" />) : (<SignInPage />)
						)}
					/>
					<Route
						exact
						path="/documents"
						render={() => (
							isAuthenticated() ? (<Documents />) : (<Redirect to="/" />)
						)}
					/>
					<Route
						exact
						path="/document/:id"
						render={() => (
							isAuthenticated() ? (<DocumentDetails />) : (<Redirect to="/" />)
						)}
					/>
					<Route
						exact
						path="/mydocuments"
						render={() => (
							isAuthenticated() ? (<MyDocuments />) : (<Redirect to="/" />)
						)}
					/>
					<Route
						exact
						path="/search"
						render={() => (
							isAuthenticated() ? (<Search />) : (<Redirect to="/" />)
						)}
					/>
					<Route
						exact
						path="/searchresults"
						render={() => (
							isAuthenticated() ? (<SearchResults />) : (<Redirect to="/" />)
						)}
					/>
					<Route
						exact
						path="/allusers"
						render={() => (
							(isAuthenticated() && isAdmin()) ? (<AllUsers />) : (<Redirect to="/" />)
						)}
					/>
					<Route
						exact
						path="/settings"
						render={() => (
							isAuthenticated() ? (<Settings />) : (<Redirect to="/" />)
						)}
					/>
				</Switch>
			</App>
		</Router>
	</Provider>
	, document.getElementById('app')
);
