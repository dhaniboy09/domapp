import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import { expect } from 'chai';
import { updatePassword } from '../../src/actions/updatePassword';
import * as types from '../../src/actions/actionTypes';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('async actions', () => {
	beforeEach(() => moxios.install());
	afterEach(() => moxios.uninstall());
	it('creates UPDATE_PASSWORD when a new user has been created', (done) => {
		const userData = [{
			id: 6,
			firstName: 'Josh',
			lastName: 'Hurl',
			email: 'jh@yahoo.com',
			password: '1234567890'
		}];
		moxios.stubRequest(`/api/v1/users/password/${userData.id}`, userData, {
			status: 200,
			response: {
				password: userData.password
			}
		});
		const expectedActions = [
			{ type: types.UPDATE_PASSWORD, password: userData.password }
		];
		const store = mockStore({}, expectedActions);
		done();
		return store.dispatch(updatePassword(userData)).then(() => {
			expect(store.getActions()).to.eql(expectedActions);
		});
	});
});
