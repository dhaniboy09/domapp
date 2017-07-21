import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import { expect } from 'chai';
import { deactivateAccount } from '../../src/actions/deactivateAccount';
import * as types from '../../src/actions/actionTypes';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('async actions', () => {
	beforeEach(() => moxios.install());
	afterEach(() => moxios.uninstall());
	it('creates DEACTIVATE_ACCOUNT when deleting user has been done', (done) => {
		const userId = 5;
		moxios.stubRequest(`/api/v1/users/${userId}`, {
			status: 200,
			response: {
				message: 'Account Deleted'
			}
		});
		const expectedActions = [
			{ type: types.DEACTIVATE_ACCOUNT, userId }
		];
		const store = mockStore({ allUsers: [] }, expectedActions);
		done();
		return store.dispatch(deactivateAccount(userId)).then(() => {
			expect(store.getActions()).to.eql(expectedActions);
		});
	});
});
