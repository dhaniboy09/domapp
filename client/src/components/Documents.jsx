import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
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
		this.handlePageChange = this.handlePageChange.bind(this);
	}
	/**
	 * @description Lifcycle Method
	 * @return {void}
	 */
	componentDidMount() {
		this.props.allDocuments(this.state);
	}
	/**
	 * @description Allows user navigate pages by changing offset
	 * @param  {object} page 
	 * @return {void}
	 */
	handlePageChange(page) {
    const selected = page.selected;
    const offset = Math.ceil(selected * this.state.limit);
    this.setState({ offset }, () => {
      this.props.allDocuments(this.state);
    });
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
		console.log(this.props.pagination.pages);
		const emptyDocuments = (
			<div className="empty">
				<h5>No Public/Role documents!</h5>
			</div>
		);
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
				<ReactPaginate
          previousLabel={<i className="fa fa-chevron-left fa-2x" aria-hidden="true" />}
          nextLabel={<i className="fa fa-chevron-right fa-2x" aria-hidden="true" />}
          breakLabel={<a href="">...</a>}
          breakClassName={'break-me'}
          pageCount={this.props.pagination.pages}
          initialPage={0}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageChange}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
        />
				<div className="document-panel">
					<div className="f-center">
						<h5 className="document-panel-header"><span>All Documents</span></h5>
						{/* <span className="page-count">Page {currentPage} of {pages}</span> */}
						<div className="col s12">
							<div className="row">
								{this.props.documents.length === 0 ? emptyDocuments : ''}
								{this.props.documents.map(document => (
									<DocumentCard
										document={document}
										key={document.id}
									/>
								)) }
							</div>
						</div>
					</div>
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

