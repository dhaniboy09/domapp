import { expect } from 'chai';
import { SET_CURRENT_USER, CREATE_USER } from '../../src/actions/actionTypes';
import reducer from '../../src/reducers/auth';
import mockData from '../../../server/test/mockData';

describe('User reducer', () => {
	it('should return the initial state', () => {
		expect(reducer(undefined, {})).to.eql(
			{
				isAuthenticated: false,
				user: {}
			}
		);
	});
});
