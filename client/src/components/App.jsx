import React from 'react';
import Header from './Header';
// import {connect} from 'react-redux';

// const mapStateToProps = state => ({appName: state.appName});

class App extends React.Component {
	render() {
		return (
			<div className="main">
				<Header />
				{this.props.children}
			</div>
		);
	}
}
export default App;

// export default connect(mapStateToProps, () => ({}))(App);

