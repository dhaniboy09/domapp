import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';

/**
 * @description Container for all components
 * @return {void}
 */
const App = () => ({
	render() {
		return (
			<div className="main">
				<Header />
				{this.props.children}
				<div className="clear" />
			</div>
		);
	}
});

App.propTypes = {
	children: PropTypes.element.isRequired
};
export default App;

