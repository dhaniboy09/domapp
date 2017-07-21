import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import { expect } from 'chai';
import { documentDetails } from '../../src/actions/documentDetails';
import * as types from '../../src/actions/actionTypes';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('async actions', () => {
	beforeEach(() => moxios.install());
	afterEach(() => moxios.uninstall());
	it('creates DOCUMENT_DETAILS when viewing document details', (done) => {
		const documentId = 5;
		const document = [{
			id: 78,
			title: 'Errand Runners',
			content: 'Hey everyone',
			access: 'public',
			userId: 16,
			userRoleId: 2,
			createdAt: '2017-07-15T15:59:40.262Z',
			updatedAt: '2017-07-15T17:31:48.392Z'
		}];
		moxios.stubRequest(`/api/v1/documents/${documentId}`, {
			status: 200,
			response: {
				document
			}
		});
		const expectedActions = [
			{ type: types.DOCUMENT_DETAILS, document }
		];
		const store = mockStore({ document: [] }, expectedActions);
		done();
		return store.dispatch(documentDetails(documentId)).then(() => {
			expect(store.getActions()).to.eql(expectedActions);
		});
	});
});
