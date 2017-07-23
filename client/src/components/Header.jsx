import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { signout } from '../actions/signInAction';

/**
 * @class Header
 * @extends {React.Component}
 */
class Header extends React.Component {
	/**
	 * @param  {object} props
	 * @return {void}
	 */
	constructor(props) {
		super(props);
		this.signout = this.signout.bind(this);
	}
	/**
	 * @description Logs user out of the app
	 * @param  {object} e
	 * @return {void}
	 */
	signout(e) {
		e.preventDefault();
		this.props.signout();
		this.props.history.push('/');
	}
	/**
	 * @description Renders content to the screen
	 * @return {void}
	 */
	render() {
		const { isAuthenticated, user } = this.props.auth;
		let currentUser, currentUserRole = '';
		if (isAuthenticated === true) {
			currentUser = user.firstName;
			currentUserRole = user.roleId;
		}
		const userLinks = (
			<div className="nav-wrapper">
				<a href="/documents" className="brand-logo">Domapp</a>
				<ul id="nav-mobile" className="right hide-on-med-and-down">
					<a className="dropdown-button" data-activates="dropdown1">
						{currentUser && currentUser} <i className="fa fa-caret-down" aria-hidden="true" />
					</a>
					<ul id="dropdown1" className="dropdown-content">
						<li><a href="/mydocuments">My Documents</a></li>
						<li className="divider" />
						<li><a href="/documents">All Documents</a></li>
						<li className="divider" />
						<li><a href="/search">Search</a></li>
						<li className="divider" />
						<li><a href="/settings">Settings</a></li><br />
						<li className="divider" />
						{currentUserRole === 1 ? <li><a href="/allusers">All Users</a></li> : ''}
						<li className="divider" />
						<li><a href="" onClick={this.signout}>Log out</a> </li>
					</ul>
				</ul>
			</div>
		);
		const guestLinks = (
			<div className="nav-wrapper">
				<a href="/" className="brand-logo">Domapp</a>
				<ul id="nav-mobile" className="right hide-on-med-and-down">
					<li><Link to="/signin">Sign In</Link></li>
					<li><a href="/">Sign Up</a></li>
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
	auth: propTypes.shape({
		user: propTypes.shape({
			firstName: propTypes.string.isRequired,
			roleId: propTypes.number.isRequired
		})
	}).isRequired,
	signout: propTypes.func.isRequired,
	history: propTypes.shape({
		push: propTypes.func.isRequired,
	}).isRequired
};
/**
 * @description Maps State to Props
 * @param  {object} state
 * @return {void}
 */
function mapStateToProps(state) {
	return {
		auth: state.auth
	};
}
export default withRouter(connect(mapStateToProps, { signout })(Header));
