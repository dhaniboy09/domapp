import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import propTypes from 'prop-types';
import { signout } from '../actions/signInAction';

class Header extends React.Component {
	constructor(props) {
		super(props);
		this.signout = this.signout.bind(this);
	}
	signout(e) {
		e.preventDefault();
		this.props.signout();
		this.props.history.push('/');
	}
	render() {
		const { isAuthenticated, user } = this.props.auth;
		let currentUser = '';
		if (isAuthenticated === true) {
			currentUser = user.user.firstName;
		}
		const userLinks = (
			<div className="nav-wrapper">
				<a href="/documents" className="brand-logo">Domapp</a>
				<ul id="nav-mobile" className="right hide-on-med-and-down">
					<li><Link to="/mydocuments">My Documents</Link></li>
					<li><a href="/settings">Settings</a></li>
					<li><a href="/contact">Contact Us</a></li>
					<li><Link to="" onClick={this.signout}>Log out</Link> </li>
				</ul>
			</div>
		);
		const guestLinks = (
			<div className="nav-wrapper">
				<a href="/" className="brand-logo">Domapp</a>
				<ul id="nav-mobile" className="right hide-on-med-and-down">
					<li><Link to="/signin">Sign In</Link></li>
					<li><a href="#sign-up-form">Sign Up</a></li>
					<li><a href="/documents">Contact Us</a></li>
				</ul>
			</div>
		);
		return (
			<div>
				<nav>
					{isAuthenticated ? userLinks : guestLinks}
				</nav>
			</div>
		);
	}
}
Header.propTypes = {
	auth: propTypes.object.isRequired,
	signout: propTypes.func.isRequired,
	history: propTypes.object
};

function mapStateToProps(state) {
	return {
		auth: state.auth
	};
}
export default withRouter(connect(mapStateToProps, { signout })(Header));
