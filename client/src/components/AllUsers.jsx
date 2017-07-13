import React from 'react';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { allUsers } from '../actions/allUsers';
import { removeUser } from '../actions/removeUser';
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
			searchString: '',
			users: []
		};
		this.onChange = this.onChange.bind(this);
		this.handleDeleteUser = this.handleDeleteUser.bind(this);
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
			users: nextProps.users
		});
	}
	/**
	 * @description Allows user Interact with Input boxes
	 * @param  {object} e
	 * @return {void}
	 */
	onChange(e) {
		this.setState({ searchString: e.target.value });
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
			// childrenElement: () => <div>Custom UI</div>,
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
	 * @description Render content to the screen
	 * @return {void}
	 */
	render() {
		const searchString = this.state.searchString.trim().toLowerCase();
		let users = _.map(this.state.users);
		if (searchString.length > 0) {
			users = users.filter((user) => {
				let filters = [user.firstName, user.lastName].join('|');
				filters = filters.toString().toLowerCase();
				return (filters.indexOf(searchString) !== -1);
			});
		}
		return (
			<div>
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
										<input
											type="text"
											value={this.state.searchString}
											onChange={this.onChange}
											placeholder="Search by name"
										/>
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
											<a href="#!" role="button" onClick={() => this.handleDeleteUser(user.id)}>
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
};
/**
 * @description Maps State to Props
 * @param  {object} state
 * @return {void}
 */
function mapStateToProps(state) {
	return {
		users: state.users.allUsers,
		pagination: state.userDocuments.pagination
	};
}
export default withRouter(connect(mapStateToProps, { allUsers, removeUser })(AllUsers));

