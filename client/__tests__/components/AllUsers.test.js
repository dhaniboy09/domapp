import React from 'react';
import { assert } from 'chai';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { spy } from 'sinon';
import { AllUsers } from '../../src/components/AllUsers';


const allUsersMock = jest.fn();
const removeUserMock = spy(() => new Promise(() => {}));
const searchUsersMock = spy(() => new Promise(() => {}));
const mockStore = configureStore();
const store = mockStore({
	auth: { isAuthenticated: true, user: {} },
	users: { isAuthenticated: false, users: {}, allUsers: {}, userSearch: {}, pagination: [] },
	userDocuments: { documents: [{}], searchResults: [], document: {}, pagination: {}, errors: {} }
});
const users = [
	{
		id: 53,
		firstName: 'Haroun',
		lastName: 'Popoola',
		email: 'hp@yahoo.com',
		password: '$2a$10$jI9sn2FOeRYuKrnnF7ujgeJHAyjBskZT5AGM6MHb3brQ6/xZMhZEy',
		roleId: 2,
		createdAt: '2017-07-17T15:11:51.002Z',
		updatedAt: '2017-07-17T15:11:51.002Z'
	}
];
const pagination = {
	totalCount: 55,
	pages: 10,
	currentPage: 1,
	pageSize: 6
};
describe('Documents Page', () => {
	it('should call ComponentDidMount()', () => {
		const componentWillMountSpy = spy(AllUsers.prototype, 'componentWillMount');
		mount(
			<Router >
				<Provider store={store}>
					<AllUsers
						pagination={pagination}
						allUsers={allUsersMock}
						removeUser={removeUserMock}
						searchUsers={searchUsersMock}
					/>
				</Provider>
			</Router>
		);
		assert.ok(AllUsers.prototype.componentWillMount.calledOnce);
		componentWillMountSpy.restore();
	});
	it('should call componentWillReceiveProps()', () => {
		const componentWillReceivePropsSpy = spy(AllUsers.prototype, 'componentWillReceiveProps');
		const wrapper = mount(
			<Router >
				<Provider store={store}>
					<AllUsers
						pagination={pagination}
						allUsers={allUsersMock}
						removeUser={removeUserMock}
						searchUsers={searchUsersMock}
						users={[]}
					/>
				</Provider>
			</Router>
		);
		wrapper.setProps({ users: [] });
		assert.ok(AllUsers.prototype.componentWillReceiveProps.calledOnce);
		componentWillReceivePropsSpy.restore();
	});
	it('Should render a ReactPaginate component', () => {
		const wrapper = mount(
			<Router >
				<Provider store={store}>
					<AllUsers
						pagination={pagination}
						allUsers={allUsersMock}
						removeUser={removeUserMock}
						searchUsers={searchUsersMock}
						users={users}
					/>
				</Provider>
			</Router>
		);
		wrapper.setState({ users });
		const nextButton = wrapper.find('#btn-Next');
		assert.equal(nextButton.length, 1);
	});
	it('should call handleSearch on keyUp', () => {
		const handleSearchSpy = spy(AllUsers.prototype, 'handleSearch');
		const wrapper = mount(
			<Router >
				<Provider store={store}>
					<AllUsers
						pagination={pagination}
						allUsers={allUsersMock}
						removeUser={removeUserMock}
						searchUsers={searchUsersMock}
						users={users}
					/>
				</Provider>
			</Router>
		);
		wrapper.setState({ users });
		wrapper.setState({ searchQuery: 'Test' });
		wrapper.find('input#search').simulate('keyUp', handleSearchSpy);
		assert.ok(handleSearchSpy.calledOnce);
	});
	it('should call onChange on input change', () => {
		const onChangeSpy = spy(AllUsers.prototype, 'onChange');
		const event = { target: { value: 'hoyt' } };
		const wrapper = mount(
			<Router >
				<Provider store={store}>
					<AllUsers
						pagination={pagination}
						allUsers={allUsersMock}
						removeUser={removeUserMock}
						searchUsers={searchUsersMock}
						users={users}
					/>
				</Provider>
			</Router>
		);
		wrapper.find('input#search').simulate('change', onChangeSpy, event);
		assert.ok(onChangeSpy.calledOnce);
	});
});
