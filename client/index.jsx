import React from 'react';
import { render } from 'react-dom';
import { createBrowserHistory } from 'history';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from './components/App';
import Home from './components/Home';

const history = createBrowserHistory();

render(
	// <Provider store={ store }>
		<Router history={ history }>
			<App>
				<Switch>
					<Route path="/" component={Home} />
				</Switch>
			</App>
		</Router>
	// </Provider>
	, document.getElementById('app')
);
