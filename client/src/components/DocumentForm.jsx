import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import propTypes from 'prop-types';
import TinyMCE from 'react-tinymce';
import { newDocument } from '../actions/newDocument';
import { allDocuments } from '../actions/allDocuments';
import validateInput from '../../../server/helpers/createDocumentValidation';

/**
 * 
 * @class SignInForm
 * @extends {React.Component}
 */
export class DocumentForm extends React.Component {
	/**
	 * @param  {object} props
	 * @return {void}
	 */
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			content: '',
			access: '',
			errors: '',
			limit: this.props.limit,
			offset: this.props.offset,
			success: {}
		};
		this.onChange = this.onChange.bind(this);
		this.createDocument = this.createDocument.bind(this);
		this.onEditorChange = this.onEditorChange.bind(this);
	}
	/**
	 * @description Gets content from TinyMCE ediotr
	 * @param  {object} e
	 * @return {void}
	 */
	onEditorChange(e) {
		this.setState({ content: e.target.getContent() });
	}
	/**
	 * @param  {object} e
	 * @return {void}
	 */
	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}
	/**
	 * @return {void}
	 */
	createDocument() {
		if (this.validateForm()) {
			this.setState({
				errors: {},
				title: '',
				content: '',
				access: '' });
			this.props.newDocument(this.state).then(() => {
				this.props.allDocuments(this.state);
				Materialize.toast('Document Created', 4000);
			}).catch((err) => {
				Materialize.toast(err.response.data.message, 4000);
			});
		}
	}
	/**
	 * @description Checks for form validity
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
				<div className="form">
					<div className="f-center">
						<h5>New Document</h5> <br />
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
						<div>
							<TinyMCE
								config={{
									plugins: 'link image code',
									toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
								}}
								content={this.state.content}
								onChange={this.onEditorChange}
							/>
						</div>
						<br />
						<button
							className="button-primary button-block modal-close"
							id="btn-createdocument"
							onClick={this.createDocument}
						>
							Create
						</button>
					</div>
				</div>
			</div>
		);
	}
}
DocumentForm.propTypes = {
	newDocument: propTypes.func.isRequired,
	allDocuments: propTypes.func.isRequired
};

/**
 * @description Maps State to Props
 * @param  {object} state
 * @return {object}
 */
function mapStateToProps(state) {
	return {
		userDocuments: state.userDocuments,
	};
}

export default withRouter(connect(mapStateToProps, { newDocument, allDocuments })(DocumentForm));
