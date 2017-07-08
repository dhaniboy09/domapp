import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import propTypes from 'prop-types';
import classNames from 'classnames';
import isEmpty from 'lodash/isEmpty';
import { editDocument } from '../actions/editDocument';
import validateInput from '../../../server/helpers/editDocumentValidation';

/**
 * @class SignInForm
 * @extends {React.Component}
 */
class DocumentForm extends React.Component {
	/**
	 * @param  {object} props
	 * @return {void}
	 */
	constructor(props) {
		super(props);
		this.state = {
			title: this.props.document.title,
			content: this.props.document.content,
			access: this.props.document.access,
			id: this.props.document.id,
			errors: {},
			isClicked: false
		};
		this.onChange = this.onChange.bind(this);
		this.updateDocument = this.updateDocument.bind(this);
	}
	/**
	 * @param  {object} e
	 * @return {void}
	 */
	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}
	/**
	 * @description Checks for form validity
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
	 * @return {void}
	 * @param {object} e
	 */
	updateDocument(e) {
		$('.action_compute').click(function() {
    if($('#username').val() == ""){
        $('#show_error').show();
        return false;
    }
	});
		if (this.isValid()) {
			this.setState({ isClicked: true });
			this.setState({ errors: {} });
			this.props.editDocument(this.state).then(
				() => {
					// Materialize.toast('Document Updated', 4000);
				},
				(err) => {
					this.setState({ errors: err.response.data });
				}
			);
		}
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
		// console.log(isEmpty(this.state.title), 'hi');
		// let btnClass = classNames({
		// 	'button-primary': true,
		// 	'button-block': true,
		// 	'modal-close': (isEmpty(this.state.title) === false),
		// 	'modalor': (isEmpty(this.state.title) === true)
		// });
		return (
			<div>
				<div className="form">
					<div className="f-center">
						<span className="sign-up-error">{errors.title}</span><br />
						<span className="sign-up-error">{errors.content}</span><br />
						<label htmlFor="title">Title</label>
						<input
							className="browser-defaults"
							type="text"
							name="title"
							id="title"
							value={this.state.title}
							onChange={this.onChange}
							placeholder="Title"
						/>
						<br />
						<label htmlFor="selectbox">Access</label>
						<select name="access" onChange={this.onChange}>
							<option value="public">Public</option>
							<option value="private">Private</option>
							<option value="role">Role</option>
						</select>
						<br />
						<label htmlFor="content">Content</label>
						<textarea
							className="browser-defaults"
							name="content"
							id="content"
							value={this.state.content}
							onChange={this.onChange}
							placeholder="Content"
						/>
						<br />
						<button className="button-primary button-block" onClick={this.updateDocument}>
							Update
						</button>
					</div>
				</div>
			</div>
		);
	}
}
DocumentForm.propTypes = {
	editDocument: propTypes.func.isRequired,
	document: propTypes.object.isRequired,
	history: propTypes.object
};

function mapStateToProps(state) {
	return {
		userDocuments: state.userDocuments
	};
}

export default withRouter(connect(null, { editDocument })(DocumentForm));
