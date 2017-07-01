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

render(
	<Provider store={store}>
		<Router history={history}>
			<App>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/signin" component={SignInPage} />
					<Route exact path="/documents" component={Documents} />
					<Route exact path="/mydocuments" component={MyDocuments} />
				</Switch>
			</App>
		</Router>
	</Provider>
	, document.getElementById('app')
);
