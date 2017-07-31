import React from 'react';
import { assert } from 'chai';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { spy } from 'sinon';
import { Search } from '../../src/components/Search';
import dummyData from '../../__mocks__/dummyData';

const searchDocumentsMock = jest.fn();
const mockStore = configureStore();
const store = mockStore({
	auth: { isAuthenticated: true,
		user: { id: 16, firstName: 'Thorsa', lastName: 'Asgard', email: 'tc@yahoo.com', roleId: 2, iat: 1500893664, exp: 1500976464 }
	},
	users: { isAuthenticated: false, users: {}, allUsers: {}, userSearch: {}, pagination: [] },
	userDocuments: {
		searchResults: [
			{ id: 83, title: 'E101', content: 'E101', access: 'public', userId: 16, userRoleId: 2, createdAt: '2017-07-17', updatedAt: '2017-07-17' }
		],
		pagination: { totalCount: 6, pages: 1, currentPage: 1, pageSize: 6 }
	}
});

describe('Search Page', () => {
	it('should call componentWillReceiveProps()', () => {
		const componentWillReceivePropsSpy = spy(Search.prototype, 'componentWillReceiveProps');
		const wrapper = mount(
			<Router >
				<Provider store={store}>
					<Search
						pagination={dummyData.pagination}
						searchDocuments={searchDocumentsMock}
						searchResults={[]}
					/>
				</Provider>
			</Router>
		);
		wrapper.setProps({ searchResults: dummyData.searchResults });
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
						pagination={dummyData.pagination}
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
						pagination={dummyData.pagination}
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
						pagination={dummyData.pagination}
						searchDocuments={searchDocumentsMock}
						searchResults={dummyData.searchResults}
						userSearchResults={dummyData.searchResults}
					/>
				</Provider>
			</Router>
		);
		wrapper.setState({ searchResults: dummyData.searchResults });
		const nextButton = wrapper.find('#btn-Next');
		assert.equal(nextButton.length, 1);
	});
});
