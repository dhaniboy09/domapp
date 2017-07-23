import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import { expect } from 'chai';
import { userSignUpRequest } from '../../src/actions/signUpActions';
import * as types from '../../src/actions/actionTypes';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('async actions', () => {
	beforeEach(() => moxios.install());
	afterEach(() => moxios.uninstall());
	it('creates CREATE_USER when a new user has been created', (done) => {
		const userData = [{
			firstName: 'Josh',
			lastName: 'Hurl',
			email: 'jh@yahoo.com',
			password: '1234567890'
		}];
		moxios.stubRequest('/auth/v1/users', userData, {
			status: 200,
			response: {
				userData
			}
		});
		const expectedActions = [
			{ type: types.CREATE_USER, userData }
		];
		const store = mockStore({}, expectedActions);
		done();
		return store.dispatch(userSignUpRequest(userData)).then(() => {
			expect(store.getActions()).to.eql(expectedActions);
		});
	});
});
