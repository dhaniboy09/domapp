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
class UpdateProfileForm extends React.Component {
	/**
	 * @constructor constructor
	 * @param  {object} props
	 * @return {void}
	 */
	constructor(props) {
		super(props);
		this.decoded = jwt(localStorage.getItem('token'));
		this.state = {
			firstName: '',
			lastName: '',
			email: '',
			id: this.decoded.id,
			disabled: true,
			errors: {}
		};
		this.onChange = this.onChange.bind(this);
		this.updateProfile = this.updateProfile.bind(this);
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
	 * @description Triggers action to sign up users
	 * @param  {object} e
	 * @return {void}
	 */
	updateProfile(e) {
		e.preventDefault();
		if (this.isValid()) {
			this.setState({ errors: {} });
			this.props.updateProfile(this.state).then(
				() => {
					
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
			<div className="s-form-wrapper">
				<div className="s-form">
					<label htmlFor="firstName">First Name</label>
					<input
						id="firstName"
						type="text"
						value={this.state.firstName}
						onChange={this.onChange}
						name="firstName"
					/>
					<span className="sign-up-error">{errors.firstName}</span>
					<label htmlFor="lastName">Last Name</label>
					<input
						id="lastName"
						type="text"
						value={this.state.lastName}
						onChange={this.onChange}
						name="lastName"
					/>
					<span className="sign-up-error">{errors.lasttName}</span>
					<label htmlFor="email">Email</label>
					<input
						id="email"
						type="text"
						value={this.state.email}
						onChange={this.onChange}
						name="email"
					/>
					<span className="sign-up-error">{errors.email}</span>
					<button
						className="button-primary button-block s-button"
						onClick={this.updateProfile}
						disabled={this.state.disabled}
					>
						Update
					</button>
				</div>
			</div>
		);
	}
}
UpdateProfileForm.propTypes = {
	updateProfile: propTypes.func.isRequired,
	history: propTypes.object.isRequired,
	users: propTypes.object.isRequired,
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

export default withRouter(connect(mapStateToProps, { updateProfile, fetchUser })(UpdateProfileForm));

