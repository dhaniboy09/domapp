import React from 'react';
import { assert } from 'chai';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { spy } from 'sinon';
import { Search } from '../../src/components/Search';

const searchDocumentsMock = jest.fn();
const mockStore = configureStore();
const store = mockStore({
	auth: {
    isAuthenticated: true,
    user: {
      id: 16,
      firstName: 'Thorsa',
      lastName: 'Asgard',
      email: 'tc@yahoo.com',
      roleId: 2,
      iat: 1500893664,
      exp: 1500976464
    }
  },
  users: {
    isAuthenticated: false,
    users: {},
    allUsers: {},
    userSearch: {},
    pagination: []
  },
  userDocuments: {
    searchResults: [
      {
        id: 83,
        title: 'Errand 101',
        content: 'Errand 101',
        access: 'public',
        userId: 16,
        userRoleId: 2,
        createdAt: '2017-07-17T04:09:12.432Z',
        updatedAt: '2017-07-17T04:09:12.432Z'
      },
      {
        id: 84,
        title: 'Errand 102',
        content: 'Errand 101',
        access: 'public',
        userId: 16,
        userRoleId: 2,
        createdAt: '2017-07-17T04:09:18.695Z',
        updatedAt: '2017-07-17T04:09:18.695Z'
      },
      {
        id: 85,
        title: 'Errand 103',
        content: 'Errand 101',
        access: 'public',
        userId: 16,
        userRoleId: 2,
        createdAt: '2017-07-17T04:09:25.313Z',
        updatedAt: '2017-07-17T04:09:25.313Z'
      },
      {
        id: 86,
        title: 'Errand 104',
        content: 'Errand 101',
        access: 'public',
        userId: 16,
        userRoleId: 2,
        createdAt: '2017-07-17T04:09:36.146Z',
        updatedAt: '2017-07-17T04:09:36.146Z'
      },
      {
        id: 87,
        title: 'Errand 105',
        content: 'Errand 101',
        access: 'public',
        userId: 16,
        userRoleId: 2,
        createdAt: '2017-07-17T04:09:42.371Z',
        updatedAt: '2017-07-17T04:09:42.371Z'
      },
      {
        id: 78,
        title: 'Errand Runners',
        content: 'Hey everyone',
        access: 'public',
        userId: 16,
        userRoleId: 2,
        createdAt: '2017-07-15T15:59:40.262Z',
        updatedAt: '2017-07-15T17:31:48.392Z'
      }
    ],
    pagination: {
      totalCount: 6,
      pages: 1,
      currentPage: 1,
      pageSize: 6
    }
  }
});
const searchResults = [
	{
		id: 114,
		title: 'true colors',
		content: '<p>I see your true colors</p>',
		access: 'public',
		userId: 16,
		userRoleId: 2,
		createdAt: '2017-07-21T14:53:12.916Z',
		updatedAt: '2017-07-21T14:53:12.916Z'
	}
];
const pagination = {
	totalCount: 55,
	pages: 10,
	currentPage: 1,
	pageSize: 6
};
describe('Search Page', () => {
	it('should call componentWillReceiveProps()', () => {
		const componentWillReceivePropsSpy = spy(Search.prototype, 'componentWillReceiveProps');
		const wrapper = mount(
			<Router >
				<Provider store={store}>
					<Search
						pagination={pagination}
						searchDocuments={searchDocumentsMock}
						searchResults={[]}
					/>
				</Provider>
			</Router>
		);
		wrapper.setProps({ searchResults });
		assert.ok(Search.prototype.componentWillReceiveProps.calledOnce);
		componentWillReceivePropsSpy.restore();
	});
	it('should call onChange on input change', () => {
		const onChangeSpy = spy(Search.prototype, 'onChange');
		const event = { target: { value: 'hoyt' } };
		const wrapper = mount(
			<Router >
				<Provider store={store}>
					<Search
						pagination={pagination}
						searchDocuments={searchDocumentsMock}
						searchResults={[]}
					/>
				</Provider>
			</Router>
		);
		wrapper.find('input#search').simulate('change', onChangeSpy, event);
		assert.ok(onChangeSpy.calledOnce);
	});
	it('should call handleSearch on click event', () => {
		const handleSearchSpy = spy(Search.prototype, 'handleSearch');
		const wrapper = mount(
			<Router >
				<Provider store={store}>
					<Search
						pagination={pagination}
						searchDocuments={searchDocumentsMock}
						searchResults={[]}
					/>
				</Provider>
			</Router>
		);
		wrapper.setState({ searchQuery: 'Void' });
		wrapper.find('#button-search').simulate('click');
		assert.ok(handleSearchSpy.calledOnce);
	});
	it('Should render a ReactPaginate component', () => {
		const wrapper = mount(
			<Router >
				<Provider store={store}>
					<Search
						pagination={pagination}
						searchDocuments={searchDocumentsMock}
						searchResults={searchResults}
						userSearchResults={searchResults}
					/>
				</Provider>
			</Router>
		);
		wrapper.setState({ searchResults });
		const nextButton = wrapper.find('#btn-Next');
		assert.equal(nextButton.length, 1);
	});
});
