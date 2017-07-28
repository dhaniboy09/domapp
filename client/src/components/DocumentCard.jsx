import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Parser from 'html-react-parser';
import { confirmAlert } from 'react-confirm-alert';
import { removeDocument } from '../actions/removeDocument';
import { allDocuments } from '../actions/allDocuments';

/**
 * @class Documents
 * @extends {React.Component}
 */
export class DocumentCard extends React.Component {
	/**
	 * @description cerates and intializes objects
	 * @param  {object} props
	 * @return {void}
	 */
	constructor(props) {
		super(props);
		this.state = {
			limit: this.props.limit,
			offset: this.props.offset,
		};
		this.handleDocumentDelete = this.handleDocumentDelete.bind(this);
	}
	/**
	 * @description Opens document details page
	 * @param  {string} link
	 * @return {void}
	 */
	getDocument(link) {
		this.props.history.push(link);
	}
	/**
	 * @description Handles document deletion
	 * @param  {integer} documentId
	 * @return {void}
	 */
	handleDocumentDelete(documentId) {
		confirmAlert({
			title: 'Confirm Delete',
			message: 'Are you sure ?',
			confirmLabel: 'Confirm',
			cancelLabel: 'Cancel',
			onConfirm: () => {
				this.props.removeDocument(documentId).then(() => {
					this.props.allDocuments(this.state);
					Materialize.toast('Document Deleted Successfully', 4000);
				});
			},
			onCancel: () => ''
		});
	}
	/**
	 * @description Render content to the screen
	 * @return {void}
	 */
	render() {
		const createdAt = this.props.document.createdAt;
		let content = Parser(this.props.document.content);
		const createdDate = createdAt.split('T')[0];
		content = content.length > 167 ? content.substring(0, 167) + '...' : content;
		const documentList = (
			<div className="col s4 m4 darken-1">
				<div className="card">
					<div className="card-content">
						<span className="card-title truncate">
							<a
								onClick={() => this.getDocument(`/document/${this.props.document.id}`)}
								href="#!"
								role="button"
								id="btn-singledocument"
							>
								{ this.props.document.title }
							</a>
						</span>
						<span className="created">{createdDate}</span>
						<p className="grey-light">{content}</p>
					</div>
					<div className="card-action form-card-action">
						{
							(this.props.auth.user.id === this.props.document.userId) ?
								(
									<div className="document-actions">
										<a
											href="#!"
											id="btn-deletedocument"
											onClick={() => this.handleDocumentDelete(this.props.document.id)}
										>Delete</a>
									</div>
								) : (<div><i className="fa fa-lock" aria-hidden="true" /></div>)
						}
					</div>
				</div>
			</div>
		);
		return (
			<div>
				{this.props.document.length === 0 ? <div><p>No new docs</p></div> : documentList}
			</div>
		);
	}
}
DocumentCard.propTypes = {
	allDocuments: propTypes.func.isRequired,
	limit: propTypes.number.isRequired,
	offset: propTypes.number.isRequired,
	document: propTypes.shape({
		id: propTypes.number.isRequired,
		title: propTypes.string.isRequired,
		content: propTypes.string.isRequired,
		access: propTypes.string.isRequired,
		userId: propTypes.number.isRequired,
		length: propTypes.number,
		createdAt: propTypes.string.isRequired,
	}).isRequired,
	removeDocument: propTypes.func.isRequired,
	auth: propTypes.shape({
		user: propTypes.shape({
			id: propTypes.number.isRequired,
			userId: propTypes.number,
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
		auth: state.auth
	};
}
export default withRouter(connect(mapStateToProps, { removeDocument, allDocuments })(DocumentCard));
