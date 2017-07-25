import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import propTypes from 'prop-types';
import jwt from 'jwt-decode';
import { updateProfile } from '../actions/updateProfile';
import { fetchUser } from '../actions/fetchUser';
import validateInput from '../../../server/helpers/editProfileValidation';

/**
 * @class SignUpForm
 * @description Component to render Sign Up Form
 * @extends {React.Component}
 */
export class UpdateProfileForm extends React.Component {
	/**
	 * @constructor constructor
	 * @param  {object} props
	 * @return {void}
	 */
	constructor(props) {
		super(props);
		this.decoded = jwt(localStorage.getItem('token'));
		this.state = {
			userName: this.decoded.firstName,
			firstName: '',
			lastName: '',
			email: '',
			id: this.decoded.id,
			disabled: true,
			editable: false,
			errors: {}
		};
		this.onChange = this.onChange.bind(this);
		this.updateProfile = this.updateProfile.bind(this);
		this.editProfile = this.editProfile.bind(this);
		this.cancelEdit = this.cancelEdit.bind(this);
	}
	/**
	 * @description Lifcycle Method
	 * @return {void}
	 */
	componentWillMount() {
		this.props.fetchUser(this.decoded.id).then(() => {
			this.setState({
				firstName: this.props.users.firstName,
				lastName: this.props.users.lastName,
				email: this.props.users.email
			});
		});
	}
	/**
	 * @description Allows user Interact with form fileds
	 * by setting state of form fields.
	 * @param  {object} e [description]
	 * @return {void}
	 */
	onChange(e) {
		this.setState({ disabled: false });
		this.setState({ [e.target.name]: e.target.value });
	}
	/**
	 * @description Disables Text Boxes
	 * @return {void}
	 */
	cancelEdit() {
		this.setState({ editable: false });
	}
	/**
	 * @description Enables Text Boxes for Interaction
	 * @return {void}
	 */
	editProfile() {
		this.setState({ editable: true });
	}
	/**
	 * @description Triggers action to sign up users
	 * @param  {object} e
	 * @return {void}
	 */
	updateProfile(e) {
		e.preventDefault();
		if (this.validateForm()) {
			this.setState({ errors: {} });
			this.props.updateProfile(this.state).then(
				() => {
					this.setState({ disabled: true });
					// jwt.refresh(this.decoded, 3600, process.env.SECRET_KEY);
					Materialize.toast('Profile Successfully Updated', 4000);
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
			<div className="s-form-wrapper">
				<div className="edit-profile">
					<a onClick={this.editProfile}>
						<i className="fa fa-pencil-square-o fa-lg" id="btn-Edit" aria-hidden="true"><span>Edit</span></i>
					</a>
				</div>
				<div className="s-form">
					<label htmlFor="firstName">First Name</label>
					<input
						id="firstName"
						type="text"
						value={this.state.firstName}
						onChange={this.onChange}
						name="firstName"
						disabled={!this.state.editable}
					/>
					<span className="sign-up-error">{errors.firstName}</span>
					<label htmlFor="lastName">Last Name</label>
					<input
						id="lastName"
						type="text"
						value={this.state.lastName}
						onChange={this.onChange}
						name="lastName"
						disabled={!this.state.editable}
					/>
					<span className="sign-up-error">{errors.lasttName}</span>
					<label htmlFor="email">Email</label>
					<input
						id="email"
						type="text"
						value={this.state.email}
						onChange={this.onChange}
						name="email"
						disabled={!this.state.editable}
					/>
					<span className="sign-up-error">{errors.email}</span>
					<div className="profile-update-buttons">
						<button
							className="button-primary button-block s-button"
							onClick={this.updateProfile}
							disabled={this.state.disabled}
							id="btn-Update"
						>Update</button>
						<button
							onClick={this.cancelEdit}
							className="button-primary button-block"
							disabled={!this.state.editable}
							id="btn-Cancel"
						>
							Cancel
						</button>
					</div>
				</div>
			</div>
		);
	}
}
UpdateProfileForm.propTypes = {
	updateProfile: propTypes.func.isRequired,
	users: propTypes.shape({
		firstName: propTypes.string.isRequired,
		lastName: propTypes.string.isRequired,
		email: propTypes.string.isRequired
	}).isRequired,
	fetchUser: propTypes.func.isRequired
};

/**
 * @description Maps State to Props
 * @param  {object} state
 * @return {object}
 */
function mapStateToProps(state) {
	return {
		users: state.users
	};
}

export default withRouter(connect(mapStateToProps,
	{ updateProfile, fetchUser })(UpdateProfileForm));

