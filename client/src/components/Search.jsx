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
export class Search extends React.Component {
	/**
	 * @param  {object} props
	 * @return {void}
	 */
	constructor(props) {
		super(props);
		this.state = {
			searchQuery: '',
			offset: 0,
			limit: 6,
			searchresults: this.props.searchResults
		};
		this.onChange = this.onChange.bind(this);
		this.handlePageChange = this.handlePageChange.bind(this);
		this.handleSearch = this.handleSearch.bind(this);
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
	 * @param  {object} e
	 * @return {void}
	 */
	onChange(e) {
		this.setState({ searchQuery: e.target.value });
	}
	/**
	 * @param {object} e
	 * @description Triggers search action
	 * @return {void}
	 */
	handleSearch(e) {
		e.preventDefault();
		if (this.state.searchQuery !== '') {
			this.props.searchDocuments(this.state).then(() => {
			});
		}
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
			this.props.searchDocuments(this.state);
		});
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
					(this.props.searchResults.length > 0) ? (
						<ReactPaginate
							previousLabel={<i className="fa fa-chevron-left fa-2x" aria-hidden="true" />}
							nextLabel={<i className="fa fa-chevron-right fa-2x" id="btn-Next" aria-hidden="true" />}
							breakLabel={<a href="">...</a>}
							breakClassName={'break-me'}
							pageCount={this.props.pagination.pages}
							initialPage={0}
							marginPagesDisplayed={2}
							pageRangeDisplayed={5}
							onPageChange={this.handlePageChange}
							containerClassName={'s-pagination pagination'}
							subContainerClassName={'pages pagination'}
							activeClassName={'active'}
						/>
					) : ('')
				}
				<div className="document-panel">
					<div className="f-center">
						<h5 className="document-panel-header s-panel"><span>Search Panel</span></h5>
						<form className="search-bar" id="searchBar" onSubmit={this.handleSearch}>
							<div className="input-field">
								<input
									id="search"
									type="text"
									name="searchQuery"
									placeholder="Search by title"
									value={this.state.searchQuery}
									onChange={this.onChange}
								/>
							</div>
						</form>
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
Search.propTypes = {
	searchDocuments: propTypes.func.isRequired,
	history: propTypes.shape({
		push: propTypes.func.isRequired,
	}).isRequired,
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
		documents: state.userDocuments.documents,
		searchResults: state.userDocuments.searchResults,
		pagination: state.userDocuments.pagination
	};
}
export default withRouter(connect(mapStateToProps, { searchDocuments })(Search));

