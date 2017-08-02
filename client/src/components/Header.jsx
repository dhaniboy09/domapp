import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { Dropdown, NavItem } from 'react-materialize';
import { signout } from '../actions/signInAction';

/**
 * @class Header
 * @extends {React.Component}
 */
class Header extends React.Component {
	/**
	 * @description cerates and intializes objects
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
					<Dropdown trigger={
						<a>
							{currentUser && currentUser}
							<i
								className="fa fa-caret-down"
								aria-hidden="true"
							/>
						</a>
					}
					>
						<NavItem href="/mydocuments">My Documents</NavItem>
						<NavItem divider />
						<NavItem href="/documents">All Documents</NavItem>
						<NavItem divider />
						<NavItem href="/search">Search</NavItem>
						<NavItem divider />
						<NavItem href="/settings">Settings</NavItem>
						<NavItem divider />
						{currentUserRole === 1 ?
							<NavItem>
								<a href="/allusers">All Users</a>
							</NavItem>
							: ''}
						<NavItem divider />
						<NavItem
							href=""
							onClick={this.signout}
						>Log out</NavItem>
					</Dropdown>
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
		}),
		isAuthenticated: propTypes.bool.isRequired
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
