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
		$('.modal').modal({
			dismissible: true, // Modal can be dismissed by clicking outside of the modal
			opacity: 0.5, // Opacity of modal background
		});
		$('#editModal').modal();
	}
	/**
	 * @return {void}
	 */
	deleteModal() {
		$('.modal').modal({
			dismissible: true, // Modal can be dismissed by clicking outside of the modal
			opacity: 0.5, // Opacity of modal background
		});
		$('#deleteModal').modal();
	}
	/**
	 * @return {void}
	 */
	render() {
		const emptyDocuments = (
			<p>You have no new documents</p>
		);
		const documentList = (
			<div className="col s4 m4 darken-1">
				<div className="card">
					<div className="card-content">
						<span className="card-title">{ this.props.document.title }</span>
						<p>{this.props.document.content }</p>
					</div>
					<div className="card-action form-card-action">
						<a href="#editModal" onClick={this.openModal}>Edit</a>
						<a href="#deleteModal" onClick={this.deleteModal}>Delete</a>
					</div>
				</div>
			</div>
		);
		return (

			<div>
				{this.props.document.length === 0 ? emptyDocuments : documentList}
				<div id="editModal" className="modal">
					<div className="modal-content">
						<h5>Edit Document</h5>
						<EditDocumentForm document={this.props.document}/>
					</div>
				</div>
				<div id="deleteModal" className="modal">
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
export default withRouter(connect(null, { removeDocument })(DocumentCard));
