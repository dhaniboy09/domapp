import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { searchDocuments } from '../actions/searchDocuments';
import UpdateProfileForm from './UpdateProfileForm';
import UpdatePasswordForm from './UpdatePasswordForm';

/**
 * @class Documents
 * @extends {React.Component}
 */
class Settings extends React.Component {
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
		return (
			<div className="settings-panel f-center">
				<h5 className="settings-panel-header f-center"><span>Settings</span></h5>
				<div className="row">
					<div className="col m6">
						<div className="col s4 l12 darken-1">
							<div className="card settings-card">
								<div className="card-content">
									<span className="settings-title">Profile Details</span>
									<UpdateProfileForm />
								</div>
							</div>
						</div>
					</div>
					<div className="col m6">
						<div className="col s4 l12 darken-1">
							<div className="card settings-card">
								<div className="card-content">
									<span className="settings-title">Change Password</span>
									<UpdatePasswordForm />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
Settings.propTypes = {
	searchDocuments: propTypes.func.isRequired,
	searchResults: propTypes.shape({}).isRequired
};
/**
 * @description Maps state to props
 * @param  {object} state
 * @return {object} documents
 */
function mapStateToProps(state) {
	return {
		searchResults: state.userDocuments.searchResults
	};
}
export default withRouter(connect(mapStateToProps, { searchDocuments })(Settings));

