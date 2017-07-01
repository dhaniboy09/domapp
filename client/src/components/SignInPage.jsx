import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import SignInForm from './SignInForm';
import { signin } from '../actions/signInAction';


const SignInPage = () => ({
	render() {
		const { signin } = this.props;
		return (
			<div className="sign-in">
				<div className="welcome-text">
					<h5>Welcome, Sign In to Continue</h5>
				</div>
				<SignInForm signin={signin} />
			</div>
		);
	}
});
SignInPage.propTypes = {
	signin: propTypes.func.isRequired
};
export default connect(null, { signin })(SignInPage);

