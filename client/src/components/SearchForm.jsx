import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { searchDocuments } from '../actions/searchDocuments';

$('body').on('keypress', 'input', function(args) {
    if (args.keyCode === 13) {
        $('#save_post').click();
        return false;
    }
});
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
			searchQuery: '',
			offset: 0
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
				this.props.history.push('/searchresults');
			});
		}
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
				<form className="search-bar">
					<div className="input-field">
						<input
							id="search"
							type="text"
							placeholder="Search by title"
							value={this.state.searchQuery}
							onChange={this.onChange}
						/>
					</div>
					<a role="button" id="save" className="searcher" onClick={this.handleSearch}>
						<i className="material-icons">search</i>
					</a>
				</form>

			</div>
		);
	}
}
SearchForm.propTypes = {
	searchDocuments: propTypes.func.isRequired,
	history: propTypes.shape({
		push: propTypes.func.isRequired,
	}).isRequired
};
/**
 * @description Maps state to props
 * @param  {object} state
 * @return {object} documents
 */
function mapStateToProps(state) {
	return {
		documents: state.userDocuments.documents
	};
}
export default withRouter(connect(mapStateToProps, { searchDocuments })(SearchForm));

