import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import { expect } from 'chai';
import { allUsers } from '../../src/actions/allUsers';
import * as types from '../../src/actions/actionTypes';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('async actions', () => {
	beforeEach(() => moxios.install());
	afterEach(() => moxios.uninstall());
	it('creates VIEW_ALL_DOCUMENTS when fetching all documents has been done', (done) => {
		const userList = [{
			id: 78,
			firstName: 'Errand Runners',
			lastName: 'Hey everyone',
			email: 'public',
			createdAt: '2017-07-15T15:59:40.262Z',
			updatedAt: '2017-07-15T17:31:48.392Z'
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
		moxios.stubRequest(`/api/v1/users?offset=${params.offset}&limit=${params.limit}`, {
			status: 200,
			response: {
				users: userList,
				pagination: paginationObject
			}
		});
		const expectedActions = [
			{ type: types.VIEW_ALL_USERS, users: userList, pagination: paginationObject }
		];
		const store = mockStore({ allUsers: [] }, expectedActions);
		done();
		return store.dispatch(allUsers(params)).then(() => {
			expect(store.getActions()).to.eql(expectedActions);
		});
	});
});
