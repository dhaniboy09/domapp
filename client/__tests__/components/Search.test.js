import React from 'react';
import { assert } from 'chai';
import { mount, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { spy } from 'sinon';
import { Search } from '../../src/components/Search';

const searchDocumentsMock = jest.fn();
const mockStore = configureStore();
const store = mockStore({
	auth: { isAuthenticated: true, user: {} },
	users: { isAuthenticated: false, users: {}, allUsers: {}, userSearch: {}, pagination: [] },
	userDocuments: { documents: [{}], searchResults: [], document: {}, pagination: {}, errors: {} }
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
describe('Documents Page', () => {
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
	it('should call handleSearch onSubmit', () => {
		const handleSearchSpy = spy(Search.prototype, 'handleSearch');
		const e = { preventDefault: () => {} };
		const wrapper = shallow(
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
		wrapper.find('#searchBar').simulate('submit', handleSearchSpy, e);
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
