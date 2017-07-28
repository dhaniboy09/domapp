import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import SignUpForm from './SignUpForm';
import { userSignUpRequest } from '../actions/signUpActions';
/**
 * @description Markup for Home Page
 * @return {void}
 */
const Home = () => ({
	render() {
		return (
			<div className="main">
				<div className="content">
					<h1>Domapp provides an easy solution for managing your documents. </h1>
					<p className="sub-heading">
						If you&apos;re looking for an intuitive, simple, effective
						way to manage your documents then Doomap is your choice.
					</p>
					<div className="mid-column">
						<div className="mid-column-2" />
						<div className="mid-column-1">
							<SignUpForm userSignUpRequest={this.props.userSignUpRequest} />
						</div>
					</div>
					<div className="features">
						<p className="intro">
							With Domapp document management is hassle-free
						</p>
						<div className="row f-center center-icons">
							<div className="col s4">
								<div className="round-1">
									<i className="large material-icons center-icon">view_module</i>
								</div>
								<div className="feature-text">
									<p className="main-text">Manage Docs</p>
									<p className="sub-text">Create, Read, Update and Delete Documents</p>
								</div>
							</div>
							<div className="col s4">
								<div className="round-2">
									<i className="large material-icons center-icon">lock</i>
								</div>
								<div className="feature-text">
									<p className="main-text">Granular Access</p>
									<p className="sub-text">Assign Roles to Documents and Users</p>
								</div>
							</div>
							<div className="col s4">
								<div className="round-3">
									<i className="large material-icons center-icon">assignment_ind</i>
								</div>
								<div className="feature-text">
									<p className="main-text">Manage Users</p>
									<p className="sub-text">Manage User roles and user accounts</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
});
Home.propTypes = {
	userSignUpRequest: propTypes.func.isRequired
};
export default connect(null, { userSignUpRequest })(Home);
