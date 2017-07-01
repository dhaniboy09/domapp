import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import propTypes from 'prop-types';
import { newDocument } from '../actions/newDocument';

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
			title: '',
			content: '',
			access: ''
		};
		this.onChange = this.onChange.bind(this);
		this.createDocument = this.createDocument.bind(this);
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
		this.setState({ errors: {}, isLoading: true });
		this.props.newDocument(this.state).then(
			(res) => {
				console.log('saved');
			},
			(err) => {
				console.log(err, 'not saved');
				this.setState({ errors: err.response.data, isLoading: false });
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
						<h5>New Document</h5> <br />
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
						<button className="button-primary button-block" onClick={this.createDocument}>
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
};

function mapStateToProps(state) {
	return {
		userDocuments: state.userDocuments
	};
}

export default withRouter(connect(mapStateToProps, { newDocument })(DocumentForm));
