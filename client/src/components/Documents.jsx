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
export class Documents extends React.Component {
	/**
	 * @param  {object} props
	 * @return {void}
	 */
	constructor(props) {
		super(props);
		this.state = {
			offset: 0,
			limit: 6,
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
	 * @description Lifecycle Method
	 * @param  {object} nextProps
	 * @return {void}
	 */
	componentWillReceiveProps(nextProps) {
		this.setState({ documents: nextProps.documents });
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
	 */
	openModal() {
		$('.modal').modal({
			dismissible: true,
			opacity: 0.5,
		});
		$('#myModal').modal();
	}
	/**
	 * @description Closes Modal
	 * @return {void}
	 * @param {string} [state]
	 */
	closeModal(option) {
		$('#myModal').modal(option);
	}
	/**
	 * @description Render content to the screen
	 * @return {void}
	 */
	render() {
		const emptyDocuments = (
			<div className="empty">
				<h5>No Public/Role documents!</h5>
			</div>
		);
		return (
			<div className="doc-wrapper">
				<div className="create-doc">
					<a
						className="create-doc-link"
						onClick={this.openModal}
						id="btn-newModal"
						href="#myModal"
					> New </a>
					<div id="myModal" className="modal">
						<div className="modal-content">
							<DocumentForm
								limit={this.state.limit}
								offset={this.state.offset}
								closeModal={this.closeModal}
							/>
						</div>
					</div>
				</div>
				{this.props.documents.length === 0 ? '' : (
					<ReactPaginate
						previousLabel={
							<i className="fa fa-chevron-left fa-2x" id="btn-Next" aria-hidden="true" />
						}
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
				)}
				<div className="document-panel">
					<div className="f-center" id="allDocuments-header">
						<h5 className="document-panel-header">
							<span id="sheader">All Documents</span>
						</h5>
						<div className="col s12">
							<div className="row">
								{(this.state.documents) && (this.state.documents.length === 0) ? emptyDocuments : (
									this.props.documents.map(document => (
										<DocumentCard
											document={document}
											limit={this.state.limit}
											offset={this.state.offset}
											key={document.id}
										/>
									))
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
Documents.propTypes = {
	documents: propTypes.shape({
		title: propTypes.string.isRequired,
		content: propTypes.string.isRequired,
		access: propTypes.string.isRequired,
		userId: propTypes.number.isRequired,
		map: propTypes.func.isRequired,
		length: propTypes.number.isRequired
	}).isRequired,
	allDocuments: propTypes.func.isRequired,
	pagination: propTypes.shape({
		pages: propTypes.number.isRequired
	}).isRequired,
};
/**
 * @description Maps State to Props
 * @param  {object} state
 * @return {void}
 */
function mapStateToProps(state) {
	return {
		documents: state.userDocuments.documents,
		pagination: state.userDocuments.pagination
	};
}
export default withRouter(connect(mapStateToProps, { allDocuments })(Documents));

