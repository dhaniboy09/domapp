import React from 'react';
import { assert } from 'chai';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { spy } from 'sinon';
import { AllUsers } from '../../src/components/AllUsers';
import dummyData from '../../__mocks__/dummyData';


const allUsersMock = jest.fn();
const removeUserMock = spy(() => new Promise(() => {}));
const searchUsersMock = spy(() => new Promise(() => {}));
const mockStore = configureStore();
const store = mockStore({
	auth: { isAuthenticated: true, user: {} },
	users: { isAuthenticated: false, users: {}, allUsers: {}, userSearch: {}, pagination: [] },
	userDocuments: { documents: [{}], searchResults: [], document: {}, pagination: {}, errors: {} }
});

describe('Documents Page', () => {
	it('should call ComponentDidMount()', () => {
		const componentWillMountSpy = spy(AllUsers.prototype, 'componentWillMount');
		mount(
			<Router >
				<Provider store={store}>
					<AllUsers
						pagination={dummyData.pagination}
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
						pagination={dummyData.pagination}
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
						pagination={dummyData.pagination}
						allUsers={allUsersMock}
						removeUser={removeUserMock}
						searchUsers={searchUsersMock}
						users={dummyData.users}
					/>
				</Provider>
			</Router>
		);
		wrapper.setState({ users: dummyData.users });
		const nextButton = wrapper.find('#btn-Next');
		assert.equal(nextButton.length, 1);
	});
	it('should call handleSearch on keyUp', () => {
		const handleSearchSpy = spy(AllUsers.prototype, 'handleSearch');
		const wrapper = mount(
			<Router >
				<Provider store={store}>
					<AllUsers
						pagination={dummyData.pagination}
						allUsers={allUsersMock}
						removeUser={removeUserMock}
						searchUsers={searchUsersMock}
						users={dummyData.users}
					/>
				</Provider>
			</Router>
		);
		wrapper.setState({ users: dummyData.users });
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
						pagination={dummyData.pagination}
						allUsers={allUsersMock}
						removeUser={removeUserMock}
						searchUsers={searchUsersMock}
						users={dummyData.users}
					/>
				</Provider>
			</Router>
		);
		wrapper.find('input#search').simulate('change', onChangeSpy, event);
		assert.ok(onChangeSpy.calledOnce);
	});
});
