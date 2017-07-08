import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import jwt from 'jwt-decode';
import { updatePassword } from '../actions/updatePassword';
import validateInput from '../../../server/helpers/updatePasswordValidation';

/**
 * @class SignUpForm
 * @description Component to render Sign Up Form
 * @extends {React.Component}
 */
class UpdatePasswordForm extends React.Component {
	/**
	 * @constructor constructor
	 * @param  {object} props
	 * @return {void}
	 */
	constructor(props) {
		super(props);
		this.decoded = jwt(localStorage.getItem('token'));
		this.state = {
			password: '',
			passwordConfirm: '',
			id: this.decoded.id,
			errors: {}
		};
		this.onChange = this.onChange.bind(this);
		this.updatePassword = this.updatePassword.bind(this);
	}
	/**
	 * @description Lifcycle Method
	 * @return {void}
	 */
	componentWillMount() {
		this.setState({
			password: '',
			passwordConfirm: ''
		});
	}
	/**
	 * @description Allows user Interact with form fileds
	 * by setting state of form fields.
	 * @param  {object} e [description]
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
	updatePassword(e) {
		e.preventDefault();
		if (this.isValid()) {
			this.setState({ errors: {} });
			this.props.updatePassword(this.state).then(
				() => {
					this.setState({
						password: '',
						passwordConfirm: ''
					});
					Materialize.toast('Password Successfully Updated', 4000);
				},
				(data) => { this.setState({ errors: data.response.data }); }
			);
		}
	}
	/**
	 * @description Checks that form is valid
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
		let errors = {};
		if (this.state.errors !== null) {
			errors = this.state.errors;
		}
		return (
			<div>
				<div className="s-form">
					<label htmlFor="password">New password</label>
					<input
						id="password"
						type="password"
						value={this.state.password}
						onChange={this.onChange}
						name="password"
					/>
					<span className="sign-up-error">{errors.password}</span>
					<label htmlFor="passwordConfirm">Confirm password</label>
					<input
						id="passwordConfirm"
						type="password"
						value={this.state.passwordConfirm}
						onChange={this.onChange}
						name="passwordConfirm"
					/>
					<span className="sign-up-error">{errors.passwordConfirm}</span>
					<button
						className="button-primary button-block s-button"
						onClick={this.updatePassword}
					>
					Update
					</button>
				</div>
			</div>
		);
	}
}
UpdatePasswordForm.propTypes = {
	updatePassword: propTypes.func.isRequired
};
function mapStateToProps(state) {
	return {
		users: state.users
	};
}

export default withRouter(connect(mapStateToProps, { updatePassword })(UpdatePasswordForm));

