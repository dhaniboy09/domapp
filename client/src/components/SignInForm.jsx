import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import propTypes from 'prop-types';
import { signin } from '../actions/signInAction';
import validateInput from '../../../server/helpers/signInValidation';

/**
 * @class SignInForm
 * @extends {React.Component}
 */
class SignInForm extends React.Component {
	/**
	 * @param  {object} props
	 * @return {void}
	 */
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			errors: {},
			isLoading: false
		};
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}
	/**
	 * @param  {object} e
	 * @return {void}
	 */
	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}
	/**
	 * @param  {object} e
	 * @return {void}
	 */
	onSubmit(e) {
		e.preventDefault();
		if (this.isValid()) {
			this.setState({ errors: {}, isLoading: true });
			this.props.signin(this.state).then(
				() => {
					this.props.history.push('/documents');
				},
				(err) => {
					this.setState({ errors: err.response.data, isLoading: false });
				}
			);
		}
	}
	/**
	 * @description Checks validity
	 * @return {Boolean}
	 */
	isValid() {
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
		const { errors, email, password, isLoading } = this.state;
		return (
			<div>
				{ errors.error && <div className="sign-in-error">{ errors.error }</div>}
				<div className="sign-in-form">
					<form onSubmit={this.onSubmit} className="f-center">
						<input
							type="email"
							name="email"
							id="email"
							value={this.state.email}
							onChange={this.onChange}
							placeholder="Email"
							className="si"
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
							className="si"
						/>
						<span className="sign-up-error">{errors.password}</span>
						<br />
						<button className="button-primary button-block" disabled={isLoading}>Sign In</button>
					</form>
				</div>
			</div>
		);
	}
}
SignInForm.propTypes = {
	signin: propTypes.func.isRequired,
	history: propTypes.object
};

export default withRouter(SignInForm);

