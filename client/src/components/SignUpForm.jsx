import React from 'react';
import { withRouter } from 'react-router-dom';
import propTypes from 'prop-types';
import jwtDecode from 'jwt-decode';
import validateInput from '../../../server/helpers/signUpValidation';

class SignUpForm extends React.Component {
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
	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}
	onSubmit(e) {
		e.preventDefault();
		if (this.isValid()) {
			this.setState({ errors: {} });
			this.props.userSignUpRequest(this.state).then(
				(response) => {
					localStorage.setItem('token', response.data.token);
					this.props.history.push('/documents');
				},
				(data) => { this.setState({ errors: data.response.data }); }
			);
		}
	}
	isValid() {
		const { errors, isValid } = validateInput(this.state);
		if (!isValid) {
			this.setState({ errors });
		}
		return isValid;
	}
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
							<strong>Move on to Domapp</strong>
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
						<button className="button-primary button-block">Sign Up</button>
					</form>
				</div>
			</div>
		);
	}
}
export default withRouter(SignUpForm);

SignUpForm.propTypes = {
	userSignUpRequest: propTypes.func.isRequired,
	history: propTypes.object
};
