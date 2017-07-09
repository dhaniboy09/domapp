import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { myDocuments } from '../actions/myDocuments';
import DocumentForm from './DocumentForm';
import DocumentCard from './DocumentCard';
/**
 * @class Documents
 * @extends {React.Component}
 */
class MyDocuments extends React.Component {
	/**
	 * @param  {object} props
	 * @return {void}
	 */
	constructor(props) {
		super(props);
		this.state = {
			offset: 0,
			limit: 6,
			id: this.props.auth.user.id
		};
		this.nextPage = this.nextPage.bind(this);
		this.prevPage = this.prevPage.bind(this);
		this.openModal = this.openModal.bind(this);
	}
	/**
	 * @description Lifcycle Method
	 * @return {void}
	 */
	componentDidMount() {
		this.props.myDocuments(this.state);
	}
	/**
	 * @description Goes to the next page
	 * @return {void}
	 */
	prevPage() {
		const prevOffset = ((this.props.pagination.currentPage - 1) - 1) * this.state.limit;
		this.setState({ offset: prevOffset });
		this.props.myDocuments(this.state);
	}
	/**
	 * @description Goes to the next page
	 * @return {void}
	 */
	nextPage() {
		let nextOffset = ((this.props.pagination.currentPage + 1) - 1) * this.state.limit;
		console.log(nextOffset, 'in nexpage');
		this.setState({ offset: nextOffset });
		this.props.myDocuments(this.state);
	}
	/**
	 * @description Modal to Add a Document
	 * @return {void}
	 * @param  {object} e
	 */
	openModal() {
		$('.modal').modal({
			dismissible: true, // Modal can be dismissed by clicking outside of the modal
			opacity: 0.5, // Opacity of modal background
		});
		$('#myModal').modal();
	}
	/**
	 * @description Render content to the screen
	 * @return {void}
	 */
	render() {
		const pages = this.props.pagination.pages;
		const currentPage = this.props.pagination.currentPage;
		return (
			<div className="doc-wrapper">
				<div className="create-doc">
					<a className="create-doc-link" onClick={this.openModal} href="#myModal">New</a>
					<div id="myModal" className="modal">
						<div className="modal-content">
							<DocumentForm />
						</div>
					</div>
				</div>
				<div className="document-panel">
					<div className="f-center">
						<h5 className="document-panel-header"><span>My Documents</span></h5>
						<div className="col s12">
							<div className="row">
								{ this.props.documents.map((document) => (
									<DocumentCard
										document={document}
										key={document.id}
									/>
								)) }
							</div>
						</div>
					</div>
					{ currentPage === pages ? '' : <a onClick={this.nextPage} className="next"><i className="fa fa-chevron-right fa-2x" aria-hidden="true"></i></a> }
					{ this.props.pagination.currentPage <= 1 ? '' : <a onClick={this.prevPage} className="prev"><i className="fa fa-chevron-left fa-2x" aria-hidden="true"></i></a> }
				</div>
			</div>
		);
	}
}
MyDocuments.propTypes = {
	document: propTypes.object.isRequired,
	pagination: propTypes.object.isRequired,
	documents: propTypes.object.isRequired,
	myDocuments: propTypes.func.isRequired,
	auth: propTypes.object.isRequired
};

function mapStateToProps(state) {
	return {
		// document: state.userDocuments.document,
		auth: state.auth,
		documents: state.userDocuments.documents,
		pagination: state.userDocuments.pagination
	};
}
export default withRouter(connect(mapStateToProps, { myDocuments })(MyDocuments));

