import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import { expect } from 'chai';
import { signin } from '../../src/actions/signInAction';
import * as types from '../../src/actions/actionTypes';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('async actions', () => {
	beforeEach(() => moxios.install());
	afterEach(() => moxios.uninstall());
	it('creates SET_CURRENT_USER when a user sign in has been done', (done) => {
		const user = [{
			email: 'e@yahoo.com',
			password: 'Hey everyone',
		}];
		moxios.stubRequest('auth/v1/users/login', {
			status: 200,
			response: {
				user
			}
		});
		const expectedActions = [
			{ type: types.SET_CURRENT_USER, user }
		];
		const store = mockStore({}, expectedActions);
		done();
		return store.dispatch(signin(user)).then(() => {
			expect(store.getActions()).to.eql(expectedActions);
		});
	});
});
