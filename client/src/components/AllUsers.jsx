import React from 'react';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { allUsers } from '../actions/allUsers';
import { removeUser } from '../actions/removeUser';
import { searchUsers } from '../actions/searchUsers';
/**
 * @class AllUsers
 * @extends {React.Component}
 */
class AllUsers extends React.Component {
	/**
	 * @param  {object} props
	 * @return {void}
	 */
	constructor(props) {
		super(props);
		this.state = {
			searchQuery: '',
			searchResult: [],
			users: [],
			pagination: [],
			limit: 10,
			offset: 0
		};
		this.onChange = this.onChange.bind(this);
		this.handleDeleteUser = this.handleDeleteUser.bind(this);
		this.handlePageChange = this.handlePageChange.bind(this);
		this.handleSearch = this.handleSearch.bind(this);
	}
	/**
	 * @description Lifcycle Method
	 * @return {void}
	 */
	componentWillMount() {
		this.props.allUsers(this.state);
	}
	/**
	 * @description Lifcycle Method
	 * @param {object} [nextProps]
	 * @return {void}
	 */
	componentWillReceiveProps(nextProps) {
		this.setState({
			users: nextProps.users,
			pagination: nextProps.pagination,
			searchResult: nextProps.searchResult
		});
	}
	/**
	 * @description Allows user Interact with Input boxes
	 * @param  {object} e
	 * @return {void}
	 */
	onChange(e) {
		this.setState({ searchQuery: e.target.value });
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
			this.props.allUsers(this.state);
		});
	}
	/**
	 * @description Triggers action to delete a user
	 * @param {object} [userId]
	 * @return {void}
	 */
	handleDeleteUser(userId) {
		confirmAlert({
			title: 'Confirm Delete',
			message: 'Are you sure ?',
			confirmLabel: 'Confirm',
			cancelLabel: 'Cancel',
			onConfirm: () => {
				this.props.removeUser(userId).then(() => {
					Materialize.toast('User Deleted Successfully', 4000);
				});
			},
			onCancel: () => ''
		});
	}
	/**
	 * @param {object} e
	 * @description Triggers search action
	 * @return {void}
	 */
	handleSearch(e) {
		e.preventDefault();
		if (this.state.searchQuery !== '') {
			this.props.searchUsers(this.state).then(() => {
			});
		} else {
			this.props.allUsers(this.state);
		}
	}
	/**
	 * @description Render content to the screen
	 * @return {void}
	 */
	render() {
		// const searchString = this.state.searchString.trim().toLowerCase();
		console.log(this.props.users, 'the results');
		const users = _.map(this.state.users);
		const searchList = this.state.searchResult;
		// if (searchString.length > 0) {
		// 	users = users.filter((user) => {
		// 		let filters = [user.firstName, user.lastName].join('|');
		// 		filters = filters.toString().toLowerCase();
		// 		return (filters.indexOf(searchString) !== -1);
		// 	});
		// }
		return (
			<div>
				{
					(this.state.users.length !== 0) ? (
						<ReactPaginate
							previousLabel={<i className="fa fa-chevron-left fa-2x" aria-hidden="true" />}
							nextLabel={<i className="fa fa-chevron-right fa-2x" aria-hidden="true" />}
							breakLabel={<a href="">...</a>}
							breakClassName={'break-me'}
							pageCount={this.state.pagination.pages}
							initialPage={0}
							marginPagesDisplayed={2}
							pageRangeDisplayed={5}
							onPageChange={this.handlePageChange}
							containerClassName={'user-pagination pagination'}
							subContainerClassName={'pages pagination'}
							activeClassName={'active'}
						/>
					) : ('')
				}
				<div className="user-panel">
					<div className="f-center scroll">
						<h5 className="user-panel-header"><span>All Users</span></h5>
						<table className="striped centered">
							<thead>
								<tr>
									<th>First Name</th>
									<th>Last Name</th>
									<th>Email</th>
									<th>Role #</th>
									<th><div className="user-search">
										<form >
											<input
												type="text"
												value={this.state.searchQuery}
												onChange={this.onChange}
												onKeyUp={this.handleSearch}
												placeholder="Search by name"
											/>
										</form>
									</div></th>
								</tr>
							</thead>
							<tbody>
								{users.map(user => (
									<tr>
										<td>{user.firstName}</td>
										<td>{user.lastName}</td>
										<td>{user.email}</td>
										<td>{user.roleId}</td>
										<td>
											<a role="button" onClick={() => this.handleDeleteUser(user.id)}>
												<i className="fa fa-trash" aria-hidden="true" />
											</a>
										</td>
									</tr>
								)) }
							</tbody>
						</table>
					</div>
				</div>
			</div>
		);
	}
}
AllUsers.propTypes = {
	allUsers: propTypes.func.isRequired,
	removeUser: propTypes.func.isRequired,
	users: propTypes.shape({}).isRequired,
	searchUsers: propTypes.func.isRequired,
	pagination: propTypes.shape({
		pages: propTypes.number.isRequired
	}).isRequired,
	searchResults: propTypes.shape({
		length: propTypes.number.isRequired
	}).isRequired
};
/**
 * @description Maps State to Props
 * @param  {object} state
 * @return {void}
 */
function mapStateToProps(state) {
	return {
		users: state.users.allUsers,
		pagination: state.users.pagination,
		searchResult: state.users.userSearch
	};
}
export default withRouter(connect(mapStateToProps, { allUsers, removeUser, searchUsers })(AllUsers));

