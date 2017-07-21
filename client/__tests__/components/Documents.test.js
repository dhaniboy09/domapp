import React from 'react';
import expect from 'expect';
import { mount, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { MemoryRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { Documents } from '../../src/components/Documents';

const allDocuments = jest.fn();
const mockStore = configureStore();
const store = mockStore({
	auth: {
		isAuthenticated: true,
		user: {}
	},
	users: {
		isAuthenticated: false,
		users: {},
		allUsers: {},
		userSearch: {},
		pagination: []
	},
	userDocuments: {
		documents: [{}],
		searchResults: [],
		document: {},
		pagination: {},
		errors: {}
	}
});

describe('Documents Page', () => {
	it('sets error message when trying to save empty title', () => {
		const wrapper = mount(
			<Router >
				<Provider store={store}>
					<Documents pagination={[]} documents={[]} allDocuments={allDocuments} errors={[]} />
				</Provider>
			</Router>
		);
	});
});
