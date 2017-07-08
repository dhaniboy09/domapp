import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
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
	 * @return {voif}
	 */
	componentWillReceiveProps(nextProps) {
		this.setState({ searchResults: nextProps.searchResults });
	}
	/**
	 * @param  {object} e
	 * @return {void}
	 */
	onChange(e) {
		this.setState({ searchText: e.target.value });
	}
	/**
	 * @param {object} e
	 * @description Triggers search action
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
		console.log(this.props.searchResults, 'this.props');
		return (
			<div>
				<div className="document-panel">
					<div className="f-center">
						<h5 className="document-panel-header"><span>Search Results</span></h5>
						{
							(this.props.searchResults.length === 0) ? (<h3>Nothing Found</h3>) : (
								<div className="col s12">
									<div className="row">
										{ userSearchResults.map((documents) => (
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
	searchResults: propTypes.object.isRequired
};
/**
 * @description Maps state to props
 * @param  {object} state
 * @return {object} documents
 */
function mapStateToProps(state) {
	return {
		// document: state.userDocuments.document,
		searchResults: state.userDocuments.searchResults
	};
}
export default withRouter(connect(mapStateToProps, { searchDocuments })(SearchResults));

