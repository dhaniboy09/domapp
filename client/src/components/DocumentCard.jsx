import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { removeDocument } from '../actions/removeDocument';

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
	 * @description handles document deletion
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
					Materialize.toast('Document Deleted Successfully', 12000);
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
								href="#!"
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
										<a
											href="#!"
											onClick={() => this.getDocument(`/document/${this.props.document.id}`)}
										>More</a>
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
	document: propTypes.shape({
		id: propTypes.number.isRequired,
		title: propTypes.string.isRequired,
		content: propTypes.string.isRequired,
		access: propTypes.string.isRequired,
		userId: propTypes.number.isRequired,
		length: propTypes.number.isRequired,
		createdAt: propTypes.string.isRequired,
	}).isRequired,
	removeDocument: propTypes.func.isRequired,
	auth: propTypes.shape({
		user: propTypes.shape({
			id: propTypes.number.isRequired,
			userId: propTypes.number.isRequired
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
export default withRouter(connect(mapStateToProps, { removeDocument })(DocumentCard));
