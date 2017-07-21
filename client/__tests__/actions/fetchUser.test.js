import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import { expect } from 'chai';
import { fetchUser } from '../../src/actions/fetchUser';
import * as types from '../../src/actions/actionTypes';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('async actions', () => {
	beforeEach(() => moxios.install());
	afterEach(() => moxios.uninstall());
	it('creates FETCH_USER when fetching a single user', (done) => {
		const id = 5;
		const user = [{
			id: 78,
			firstname: 'Errand Runners',
			lastName: 'Hey everyone',
			email: 'public',
			password: 16,
			userRoleId: 2
		}];
		moxios.stubRequest(`/api/v1/users/${id}`, {
			status: 200,
			response: {
				user
			}
		});
		const expectedActions = [
			{ type: types.FETCH_USER, user }
		];
		const store = mockStore({}, expectedActions);
		done();
		return store.dispatch(fetchUser(id)).then(() => {
			expect(store.getActions()).to.eql(expectedActions);
		});
	});
});
