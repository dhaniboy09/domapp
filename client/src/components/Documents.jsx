import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { allDocuments } from '../actions/allDocuments';
import DocumentForm from './DocumentForm';
import DocumentCard from './DocumentCard';

/**
 * @class Documents
 * @extends {React.Component}
 */
class Documents extends React.Component {
	/**
	 * @param  {object} props
	 * @return {void}
	 */
	constructor(props) {
		super(props);
		this.state = {
			offset: 0,
			limit: 6,
			douments: []
		};
		this.openModal = this.openModal.bind(this);
		this.nextPage = this.nextPage.bind(this);
		this.prevPage = this.prevPage.bind(this);
	}
	/**
	 * @description Lifcycle Method
	 * @return {void}
	 */
	componentDidMount() {
		this.props.allDocuments(this.state);
	}
	/**
	 * @description Goes to the next page
	 * @return {void}
	 */
	prevPage() {
		const prevOffset = ((this.props.pagination.currentPage - 1) - 1) * this.state.limit;
		this.setState({ offset: prevOffset });
		this.props.allDocuments(this.state);
	}
	/**
	 * @description Goes to the next page
	 * @param {void} e
	 * @return {void}
	 */
	nextPage(e) {
		let nextOffset = ((this.props.pagination.currentPage + 1) - 1) * this.state.limit;
		this.setState({ offset: nextOffset });
		this.props.allDocuments(this.state);
	}
	/**
	 * @description Modal to Add a Document
	 * @return {void}
	 * @param  {object} e
	 */
	openModal() {
		$('.modal').modal({
			dismissible: true,
			opacity: 0.5, 
		});
		$('#myModal').modal();
	}
	/**
	 * @description Render content to the screen
	 * @return {void}
	 */
	render() {
		// console.log(this.props.documents[0], 'in render');
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
						<h5 className="document-panel-header"><span>All Documents</span></h5>
						{/* <span className="page-count">Page {currentPage} of {pages}</span> */}
						<div className="col s12">
							<div className="row">
								{this.props.documents.map((document) => (
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
Documents.propTypes = {
	// document: propTypes.object.isRequired,
	documents: propTypes.object.isRequired,
	allDocuments: propTypes.func.isRequired,
	pagination: propTypes.object.isRequired
};

function mapStateToProps(state) {
	return {
		// document: state.userDocuments.document,
		documents: state.userDocuments.documents,
		pagination: state.userDocuments.pagination
	};
}
export default withRouter(connect(mapStateToProps, { allDocuments })(Documents));

