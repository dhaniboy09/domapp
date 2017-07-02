import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { searchDocuments } from '../actions/searchDocuments';

/**
 * @class Documents
 * @extends {React.Component}
 */
class SearchForm extends React.Component {
	/**
	 * @param  {object} props
	 * @return {void}
	 */
	constructor(props) {
		super(props);
		this.state = {
			searchText: ''
		};
		this.openModal = this.openModal.bind(this);
		this.handleSearch = this.handleSearch.bind(this);
		this.onChange = this.onChange.bind(this);
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
		this.props.searchDocuments(this.state.searchText).then((result) => {
			console.log(result, 'the result');
			this.props.history.push('/searchresults');
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
		return (
			<div>
				<div className="search-bar">
					<div className="input-field">
						<input
							id="search"
							type="search"
							name="search"
							placeholder="Search by title"
							value={this.state.searchText}
							onChange={this.onChange}
						/>
					</div>
					<a role="button" className="searcher" onClick={this.handleSearch}>
						<i className="material-icons">search</i>
					</a>
				</div>

			</div>
		);
	}
}
SearchForm.propTypes = {
	searchDocuments: propTypes.func.isRequired
};
/**
 * @description Maps state to props
 * @param  {object} state
 * @return {object} documents
 */
function mapStateToProps(state) {
	return {
		// document: state.userDocuments.document,
		documents: state.userDocuments.documents
	};
}
export default withRouter(connect(mapStateToProps, { searchDocuments })(SearchForm));

