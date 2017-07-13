import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
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
		this.openModal = this.openModal.bind(this);
		this.handlePageChange = this.handlePageChange.bind(this);
	}
	/**
	 * @description Lifcycle Method
	 * @return {void}
	 */
	componentDidMount() {
		this.props.myDocuments(this.state);
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
			this.props.myDocuments(this.state);
		});
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
		const emptyDocuments = (
			<div className="empty">
				<h5>You have no personal documents!</h5>
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
						<h5 className="document-panel-header"><span>My Documents</span></h5>
						<div className="col s12">
							<div className="row">
								{this.props.documents.length === 0 ? emptyDocuments : ''}
								{ this.props.documents.map(document => (
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
MyDocuments.propTypes = {
	pagination: propTypes.shape({
		pages: propTypes.number.isRequired
	}).isRequired,
	documents: propTypes.shape({
		title: propTypes.string.isRequired,
		content: propTypes.string.isRequired,
		access: propTypes.string.isRequired,
		userId: propTypes.number.isRequired,
		map: propTypes.func.isRequired,
		length: propTypes.number.isRequired
	}).isRequired,
	myDocuments: propTypes.func.isRequired,
	auth: propTypes.shape({
		user: propTypes.shape({
			firstName: propTypes.string.isRequired,
			roleId: propTypes.number.isRequired
		})
	}).isRequired,
};
/**
 * @description Maps State to Props
 * @param  {object} state
 * @return {void}
 */
function mapStateToProps(state) {
	return {
		auth: state.auth,
		documents: state.userDocuments.documents,
		pagination: state.userDocuments.pagination
	};
}
export default withRouter(connect(mapStateToProps, { myDocuments })(MyDocuments));

