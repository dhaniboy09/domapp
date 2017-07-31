import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import propTypes from 'prop-types';
import classnames from 'classnames';
import { newDocument } from '../actions/newDocument';
import { allDocuments } from '../actions/allDocuments';
import createDocumentValidation from '../../../server/helpers/createDocumentValidation';

/**
 * 
 * @class SignInForm
 * @extends {React.Component}
 */
export class DocumentForm extends React.Component {
	/**
	 * @description cerates and intializes objects
	 * @param  {object} props
	 * @return {void}
	 */
	constructor(props) {
		super(props);
		this.state = {
			btnStatus: false,
			title: '',
			content: '',
			access: '',
			errors: '',
			limit: this.props.limit,
			offset: this.props.offset,
			message: ''
		};
		this.onChange = this.onChange.bind(this);
		this.createDocument = this.createDocument.bind(this);
	}
	/**
	 * @description Lifecycle Method
	 * Called when an instance of the component
	 * is created or inserted into the DOM
	 * @return {void}
	 */
	componentDidMount() {
		tinymce.init({
			selector: '#content',
			plugins: 'autolink link image lists' +
								' print preview textcolor table emoticons codesample',
			toolbar: 'undo redo | bold italic | ' +
			'fontsizeselect fontselect | ' +
			'alignleft aligncenter alignright | forecolor backcolor' +
			'| table | numlist bullist | emoticons | codesample | code',
			table_toolbar: 'tableprops tabledelete ' +
			'| tableinsertrowbefore ' +
			'tableinsertrowafter tabledeleterow | tableinsertcolbefore ' +
			'tableinsertcolafter tabledeletecol',
			fontsize_formats: '8pt 10pt 12pt 14pt 18pt 24pt 36pt',
			height: 300,
			width: '100%',
			browser_spellcheck: true
		});
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
	 * @description Handles Document Creation
	 * @return {void}
	 */
	createDocument() {
		if (this.validateForm()) {
			const newContent = tinymce.activeEditor.getContent();
			if (newContent === '') {
				this.setState({ errors: '' });
				return this.setState({ message: 'Content is Required' });
			}
			const document = {
				title: this.state.title,
				access: this.state.access,
				content: newContent
			};
			this.props.newDocument(document).then(() => {
				this.props.allDocuments(this.state);
				this.setState({
					errors: {},
					title: '',
					content: tinymce.activeEditor.setContent(''),
					access: ''
				});
				this.props.closeModal('close');
				Materialize.toast('Document Created', 4000);
			}).catch((err) => {
				Materialize.toast(err.response.data.message, 4000);
				this.props.closeModal('close');
			});
		} else {
			this.setState({ btnStatus: false });
		}
	}
	/**
	 * @description Checks for form validity
	 * @return {Boolean}
	 */
	validateForm() {
		const { errors, isValid } = createDocumentValidation(this.state);
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
		const modalBtn = classnames({
			'button-primary': true,
			'button-block': true,
			'modal-close': this.state.btnStatus
		});
		return (
			<div>
				<div className="form">
					<div className="f-center">
						<h5>New Document</h5> <br />
						<span className="sign-up-error">{errors.title}</span><br />
						<span className="sign-up-error">{this.state.message}</span><br />
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
						<div id="tiny-edit">
							<div id="content">
								{ this.state.content }
							</div>
						</div>
						<br />
						<button
							className={modalBtn}
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
	allDocuments: propTypes.func.isRequired,
	closeModal: propTypes.func.isRequired,
	limit: propTypes.number.isRequired,
	offset: propTypes.number.isRequired
};

/**
 * @description Maps State to Props
 * @param  {object} state
 * @return {object}
 */
function mapStateToProps(state) {
	return {
		userDocuments: state.documents,
	};
}

export default withRouter(connect(mapStateToProps, { newDocument, allDocuments })(DocumentForm));
