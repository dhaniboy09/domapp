import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { removeDocument } from '../actions/removeDocument';
import EditDocumentForm from './EditDocumentForm';
/**
 * @class Documents
 * @extends {React.Component}
 */
class DocumentCard extends React.Component {
	/**
	 * @param  {object} props
	 * @return {void}
	 */
	constructor(props) {
		super(props);
		this.openModal = this.openModal.bind(this);
		this.handleDocumentDelete = this.handleDocumentDelete.bind(this);
	}
	/**
	 * @description Modal to Edit a Document
	 * @return {void}
	 */
	openModal() {
		$(`.modal.${this.props.document.id}`).modal({
			dismissible: true, // Modal can be dismissed by clicking outside of the modal
			opacity: 0.5, // Opacity of modal background
		});
		$(`.modal.${this.props.document.id}`).modal();
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
	 * @description handles document deletion
	 * @param  {integer} documentId
	 * @return {void}
	 */
	handleDocumentDelete(documentId) {
		confirmAlert({
			title: 'Confirm Delete',
			message: 'Are you sure ?',
			// childrenElement: () => <div>Custom UI</div>,
			confirmLabel: 'Confirm',
			cancelLabel: 'Cancel',
			onConfirm: () => {
				this.props.removeDocument(documentId).then(() => {
					Materialize.toast('Document Deleted Successfully', 4000);
				});
			},
			onCancel: () => ''
		});
	}
	/**
	 * @return {void}
	 */
	render() {
		const createdAt = this.props.document.createdAt;
		let content = this.props.document.content;
		const createdDate = createdAt.split('T')[0];
		content = content.length > 167 ? content.substring(0, 167) + '...' : content;
		const documentList = (
			<div className="col s4 m4 darken-1">
				<div className="card">
					<div className="card-content">
						<span className="card-title truncate">
							<a
								onClick={() => this.getDocument(`/document/${this.props.document.id}`)}
								role="button"
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
									<div>
										<a href="#editModal" onClick={this.openModal}>Edit</a>
										<a href="#!" onClick={() => this.handleDocumentDelete(this.props.document.id)}>Delete</a>
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
				<div id="editModal" className={`modal ${this.props.document.id}`}>
					<div className="modal-content">
						<h5>Edit Document</h5>
						<EditDocumentForm document={this.props.document} />
					</div>
				</div>
			</div>
		);
	}
}
DocumentCard.propTypes = {
	document: propTypes.object.isRequired,
	removeDocument: propTypes.func.isRequired,
	auth: propTypes.object.isRequired
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
export default withRouter(connect(mapStateToProps, { removeDocument })(DocumentCard));
