import React from 'react';
import { withRouter } from 'react-router-dom';
import propTypes from 'prop-types';
import validateInput from '../../../server/helpers/signUpValidation';

/**
 * @class SignUpForm
 * @description Component to render Sign Up Form
 * @extends {React.Component}
 */
class SignUpForm extends React.Component {
	/**
	 * @constructor constructor
	 * @param  {object} props
	 * @return {void}
	 */
	constructor(props) {
		super(props);
		this.state = {
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			passwordConfirm: '',
			errors: {}
		};
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}
	/**
	 * @description Allows user Interact with form fileds
	 * by setting state of form fields.
	 * @param  {object} e
	 * @return {void}
	 */
	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}
	/**
	 * @description Triggers action to sign up users
	 * @param  {object} e
	 * @return {void}
	 */
	onSubmit(e) {
		e.preventDefault();
		if (this.validateForm()) {
			this.setState({ errors: {} });
			this.props.userSignUpRequest(this.state).then(
				() => {
					this.props.history.push('/documents');
				},
				(err) => { this.setState({ errors: err.response.data }); }
			);
		}
	}
	/**
	 * @description Checks that form is valid
	 * @return {Boolean}
	 */
	validateForm() {
		const { errors, isValid } = validateInput(this.state);
		if (!isValid) {
			this.setState({ errors });
		}
		return isValid;
	}
	/**
	 * @description Renders content to the screen
	 * @return {void}
	 */
	render() {
		let errors = {};
		if (this.state.errors !== null) {
			errors = this.state.errors;
		}

		return (
			<div>
				<div id="sign-up-form">
					<p className="f-center f-bottom banner">
						<span className="banner-label">
							<strong id="sign-up-banner">Move on to Domapp</strong>
						</span>
					</p>
					<form onSubmit={this.onSubmit} className="f-center">
						<input
							type="text"
							name="firstName"
							id="firstName"
							value={this.state.firstName}
							onChange={this.onChange}
							placeholder="First Name"
							className="input-def"
						/>
						<span className="sign-up-error">{errors.firstName}</span>
						<br />
						<input
							type="text"
							name="lastName"
							id="lastName"
							value={this.state.lastName}
							onChange={this.onChange}
							placeholder="Last Name"
							className="input-def"
						/>
						<span className="sign-up-error">{errors.lastName}</span>
						<br />
						<input
							type="email"
							name="email"
							id="email"
							value={this.state.email}
							onChange={this.onChange}
							placeholder="Email"
							className="input-def"
						/>
						<span className="sign-up-error">{errors.email}</span>
						<br />
						<input
							type="password"
							name="password"
							id="password"
							value={this.state.password}
							onChange={this.onChange}
							placeholder="Password"
							className="input-def"
						/>
						<span className="sign-up-error">{errors.password}</span>
						<br />
						<input
							type="password"
							name="passwordConfirm"
							id="passwordConfirm"
							value={this.state.passwordConfirm}
							onChange={this.onChange}
							placeholder="Re-enter Password"
							className="input-def"
						/>
						<span className="sign-up-error">{errors.passwordConfirm}</span>
						<br />
						<button className="button-primary button-block" id="btn-signup">Sign Up</button>
					</form>
				</div>
			</div>
		);
	}
}
SignUpForm.propTypes = {
	userSignUpRequest: propTypes.func.isRequired,
	history: propTypes.shape({
		push: propTypes.func.isRequired,
	}).isRequired
};
export default withRouter(SignUpForm);

