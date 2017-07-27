import { expect } from 'chai';
import { FETCH_USER, UPDATE_PROFILE, VIEW_ALL_USERS } from '../../src/actions/actionTypes';
import reducer from '../../src/reducers/users';
import mockData from '../../../server/test/mockData';

describe('User reducer', () => {
	it('should return the initial state', () => {
		expect(reducer(undefined, {})).to.eql(
			{
				isAuthenticated: false,
				users: {},
				allUsers: {},
				userSearch: {},
				pagination: []
			}
		);
	});
	it('should handle VIEW_ALL_USERS', () => {
		expect(
			reducer({}, {
				type: VIEW_ALL_USERS,
				users: mockData.FakeUserList,
				pagination: mockData.FakePagination
			})
		).to.eql({
			allUsers: mockData.FakeUserList,
			pagination: mockData.FakePagination
		});
	});
	it('should handle FETCH_USER', () => {
		expect(
			reducer({}, {
				type: FETCH_USER,
				user: mockData.FakeUser,
			})
		).to.eql(
			mockData.FakeUser
		);
	});
	it('should handle UPDATE_PROFILE', () => {
		expect(
			reducer({}, {
				type: UPDATE_PROFILE,
				user: mockData.FakeUser,
			})
		).to.eql(
			mockData.FakeUser
		);
	});
});
