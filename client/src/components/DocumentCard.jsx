import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
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
		this.deleteDocument = this.deleteDocument.bind(this);
	}
	deleteDocument() {
		this.props.removeDocument(this.props.document.id).then((res) => {
			console.log('removed successfully');
		}).catch((err) => {
			console.log(err, 'not removed successfully');
		});
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
	 * @return {void}
	 */
	deleteModal() {
		$(`.modal.${this.props.document.id}`).modal({
			dismissible: true, // Modal can be dismissed by clicking outside of the modal
			opacity: 0.5, // Opacity of modal background
		});
		$(`.modal.${this.props.document.id}`).modal();
	}
	/**
	 * @return {void}
	 */
	render() {
		const createdAt = this.props.document.createdAt;
		let content = this.props.document.content;
		const createdDate = createdAt.split('T')[0];
		content = content.length > 167 ? content.substring(0, 167) + '...' : content;
		const emptyDocuments = (
			<p>You have no new documents</p>
		);
		const documentList = (
			<div className="col s4 m4 darken-1">
				<div className="card">
					<div className="card-content">
						<span className="card-title truncate"><a href="#!">{ this.props.document.title }</a></span>
						<span className="created">{createdDate}</span>
						<p className="grey-light">{content}</p>
					</div>
					<div className="card-action form-card-action">
						{
							(this.props.auth.user.id === this.props.document.userId) ?
								(
									<div>
										<a href="#editModal" onClick={this.openModal}>Edit</a>
										<a href="#deleteModal" onClick={this.deleteModal}>Delete</a>
									</div>
								) : (<div><i className="fa fa-lock" aria-hidden="true" /></div>)
						}
					</div>
				</div>
			</div>
		);
		return (
			<div>
				{this.props.document.length === 0 ? emptyDocuments : documentList}
				<div id="editModal" className={`modal ${this.props.document.id}`}>
					<div className="modal-content">
						<h5>Edit Document</h5>
						<EditDocumentForm document={this.props.document} />
					</div>
				</div>
				<div id="deleteModal" className={`modal ${this.props.document.id}`}>
					<div className="modal-content">
						<h5>Woah! Are you sure?</h5>
					</div>
					<div className="delete-actions">
						<button className="button-primary button-block" onClick={this.deleteDocument}>
							Delete
						</button>
						<button className="button-primary button-block modal-close">
							Cancel
						</button>
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
export default connect(mapStateToProps, { removeDocument })(DocumentCard);
