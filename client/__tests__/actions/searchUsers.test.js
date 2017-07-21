import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import { expect } from 'chai';
import { searchUsers } from '../../src/actions/searchUsers';
import * as types from '../../src/actions/actionTypes';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('async actions', () => {
	beforeEach(() => moxios.install());
	afterEach(() => moxios.uninstall());
	it('creates SEARCH_USERS when document search has been done', (done) => {
		const userList = [{
			id: 78,
			firstname: 'Errand Runners',
			lastName: 'Hey everyone',
			email: 'public',
			password: 16,
			userRoleId: 2
		}];
		const paginationObject = [{
			totalCount: 3,
			pages: 1,
			currentPage: 1,
			pageSize: 4
		}];
		const params = {
			offset: 0,
			limit: 6
		};
		moxios.stubRequest(`/api/v1/search/users?query=${params.searchQuery}&offset=${params.offset}&limit=${params.limit}`, {
			status: 200,
			response: {
				users: userList,
				pagination: paginationObject
			}
		});
		const expectedActions = [
			{ type: types.SEARCH_USERS, users: userList, pagination: paginationObject }
		];
		const store = mockStore({ allUsers: [] }, expectedActions);
		done();
		return store.dispatch(searchUsers(params)).then(() => {
			expect(store.getActions()).to.eql(expectedActions);
		});
	});
});
