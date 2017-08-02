import React from 'react';
import { withRouter } from 'react-router-dom';
import propTypes from 'prop-types';
import signInValidation from '../../../server/helpers/signInValidation';

/**
 * @class SignInForm
 * @extends {React.Component}
 */
export class SignInForm extends React.Component {
	/**
	 * @description cerates and intializes objects
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
	 * @description Allows user Interact with Input boxes
	 * @param  {object} e
	 * @return {void}
	 */
	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}
	/**
	 * @description Handles user sign in
	 * @param  {object} e
	 * @return {void}
	 */
	onSubmit() {
		if (this.validateForm()) {
			this.setState({ errors: {}, isLoading: true });
			this.props.signin(this.state).then(
				() => {
					this.props.history.push('/documents');
				},
				(err) => {
					this.setState({
						errors: err.response.data, isLoading: false
					});
				}
			);
		}
	}
	/**
	 * @description Checks Form Validity
	 * @return {Boolean}
	 */
	validateForm() {
		const { errors, isValid } = signInValidation(this.state);
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
		const { errors } = this.state;
		return (
			<div>
				{ errors.error && <div className="sign-in-error">{ errors.error }</div>}
				<div className="sign-in-form">
					<div className="f-center">
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
						<button
							className="button-primary button-block"
							id="button-signin"
							onClick={this.onSubmit}
						>
							Sign In
						</button>
					</div>
				</div>
			</div>
		);
	}
}
SignInForm.propTypes = {
	signin: propTypes.func.isRequired,
	history: propTypes.shape({
		push: propTypes.func.isRequired,
	}).isRequired
};

export default withRouter(SignInForm);

