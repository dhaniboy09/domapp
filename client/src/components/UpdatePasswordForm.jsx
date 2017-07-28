import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import jwt from 'jwt-decode';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { updatePassword } from '../actions/updatePassword';
import { deactivateAccount } from '../actions/deactivateAccount';
import updatePasswordValidation from '../../../server/helpers/updatePasswordValidation';

/**
 * @class SignUpForm
 * @description Component to render Sign Up Form
 * @extends {React.Component}
 */
export class UpdatePasswordForm extends React.Component {
	/**
	 * @description Creates and intializes objects
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
			errors: {},
			authenticated: this.props.auth.isAuthenticated
		};
		this.onChange = this.onChange.bind(this);
		this.updatePassword = this.updatePassword.bind(this);
		this.handleAccountDelete = this.handleAccountDelete.bind(this);
	}
	/**
	 * @description Lifecycle Method
	 * Called when an instance of the component
	 * is created or inserted into the DOM
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
	 * @description Allows user Interact with Input boxes
	 * @param  {object} e
	 * @return {void}
	 */
	updatePassword(e) {
		e.preventDefault();
		if (this.validateForm()) {
			this.setState({ errors: {} });
			this.props.updatePassword(this.state).then(
				() => {
					this.setState({
						password: '',
						passwordConfirm: ''
					});
					Materialize.toast('Password Successfully Updated', 4000);
				}).catch((err) => {
				Materialize.toast(err.response.data.message, 4000);
			});
		}
	}
	/**
	 * @description Checks that form is valid
	 * @return {Boolean}
	 */
	validateForm() {
		const { errors, isValid } = updatePasswordValidation(this.state);
		if (!isValid) {
			this.setState({ errors });
		}
		return isValid;
	}
	/**
	 * @description Handles Account Deletion
	 * @return {void}
	 */
	handleAccountDelete() {
		confirmAlert({
			title: 'Confirm Delete',
			message: 'Are you sure ?',
			confirmLabel: 'Confirm',
			cancelLabel: 'Cancel',
			onConfirm: () => {
				this.props.deactivateAccount(this.state.id).then(() => {
					this.props.auth.isAuthenticated = false;
					localStorage.removeItem('token');
					this.props.history.push('/');
					Materialize.toast('Account Deleted Successfully', 4000);
				});
			},
			onCancel: () => ''
		});
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
					<div className="password-update-error">
						<span className="sign-up-error">{errors.password}</span><br />
						<span className="sign-up-error">{errors.passwordConfirm}</span><br />
					</div>
					<label htmlFor="password">New password</label>
					<input
						id="password"
						type="password"
						value={this.state.password}
						onChange={this.onChange}
						name="password"
					/>
					<label htmlFor="passwordConfirm">Confirm password</label>
					<input
						id="passwordConfirm"
						type="password"
						value={this.state.passwordConfirm}
						onChange={this.onChange}
						name="passwordConfirm"
					/>
					<button
						className="button-primary button-block s-button"
						onClick={this.updatePassword}
						id="btn-updatePassword"
					>
					Update
					</button>
					<div className="danger-zone">
						<p>DANGER ZONE!!!</p>
						<button onClick={() => this.handleAccountDelete()}>Deactivate Account</button>
					</div>
					<div className="password-update-info">
						<span>**Password Update takes effect on next sign in</span>
					</div>
				</div>
			</div>
		);
	}
}
UpdatePasswordForm.propTypes = {
	updatePassword: propTypes.func.isRequired,
	deactivateAccount: propTypes.func.isRequired,
	auth: propTypes.shape({
		isAuthenticated: propTypes.func.isRequired,
		user: propTypes.shape({
			firstName: propTypes.string.isRequired,
			roleId: propTypes.number.isRequired
		})
	}).isRequired,
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
		users: state.users,
		auth: state.auth
	};
}

export default withRouter(
	connect(mapStateToProps, { updatePassword, deactivateAccount })(UpdatePasswordForm)
);

