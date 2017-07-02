import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import propTypes from 'prop-types';
import { editDocument } from '../actions/editDocument';

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
			id: this.props.document.id
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
	 * @return {void}
	 */
	updateDocument() {
		this.props.editDocument(this.state).then(
			() => {
				console.log('updated');
			},
			(err) => {
				this.setState({ errors: err.response.data });
			}
		);
	}
	/**
	 * @description Renders content to the screen
	 * @return {void}
	 */
	render() {
		return (
			<div>
				<div className="form">
					<div className="f-center">
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
						<button className="button-primary button-block modal-close" onClick={this.updateDocument}>
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
};

function mapStateToProps(state) {
	return {
		userDocuments: state.userDocuments
	};
}

export default withRouter(connect(null, { editDocument })(DocumentForm));
