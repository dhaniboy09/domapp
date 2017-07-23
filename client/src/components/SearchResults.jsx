import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import { searchDocuments } from '../actions/searchDocuments';
import DocumentCard from './DocumentCard';

/**
 * @class Documents
 * @extends {React.Component}
 */
class SearchResults extends React.Component {
	/**
	 * @param  {object} props
	 * @return {void}
	 */
	constructor(props) {
		super(props);
		this.state = {
			searchText: '',
			searchResults: this.props.searchResults
		};
		this.openModal = this.openModal.bind(this);
		this.handleSearch = this.handleSearch.bind(this);
		this.onChange = this.onChange.bind(this);
	}
	/**
	 * @description Lifecycle Method
	 * @param  {object} nextProps
	 * @return {void}
	 */
	componentWillReceiveProps(nextProps) {
		this.setState({ searchResults: nextProps.searchResults });
	}
	/**
	 * @description Makes form elements interactive
	 * @param  {object} e
	 * @return {void}
	 */
	onChange(e) {
		this.setState({ searchText: e.target.value });
	}
	/**
	 * @description Triggers search action
	 * @param {object} e
	 * @return {void}
	 */
	handleSearch() {
		this.props.searchDocuments(this.state);
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
		const userSearchResults = this.state.searchResults;
		return (
			<div>
				{
					(this.props.searchResults.length !== 0) ? (
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
					) : ('')
				}
				<div className="document-panel">
					<div className="f-center">
						<h5 className="document-panel-header"><span>Search Results</span></h5>
						{
							(this.props.searchResults.length === 0) ? (<h3>Nothing Found</h3>) : (
								<div className="col s12">
									<div className="row">
										{ userSearchResults.map(documents => (
											<DocumentCard
												document={documents}
												key={document.id}
											/>
										)) }
									</div>
								</div>
							)
						}
					</div>
				</div>
			</div>
		);
	}
}
SearchResults.propTypes = {
	searchDocuments: propTypes.func.isRequired,
	searchResults: propTypes.shape({
		length: propTypes.number.isRequired
	}).isRequired,
	pagination: propTypes.shape({
		pages: propTypes.number.isRequired
	}).isRequired
};
/**
 * @description Maps state to props
 * @param  {object} state
 * @return {object} documents
 */
function mapStateToProps(state) {
	return {
		searchResults: state.userDocuments.searchResults,
		pagination: state.userDocuments.pagination
	};
}
export default withRouter(connect(mapStateToProps, { searchDocuments })(SearchResults));

