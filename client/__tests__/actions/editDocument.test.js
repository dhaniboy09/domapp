import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import { expect } from 'chai';
import { editDocument } from '../../src/actions/editDocument';
import * as types from '../../src/actions/actionTypes';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('async actions', () => {
	beforeEach(() => moxios.install());
	afterEach(() => moxios.uninstall());
	it('creates EDIT_DOCUMENT when editing a document', (done) => {
		const documentData = [{
			id: 78,
			title: 'Errand Runners',
			content: 'Hey everyone',
			access: 'public',
			userId: 16,
			userRoleId: 2,
			createdAt: '2017-07-15T15:59:40.262Z',
			updatedAt: '2017-07-15T17:31:48.392Z'
		}];
		moxios.stubRequest(`/api/v1/documents/${documentData.id}`, documentData, {
			status: 200,
			response: {
				document: documentData
			}
		});
		const expectedActions = [
			{ type: types.EDIT_DOCUMENT, document }
		];
		const store = mockStore({ documents: [] }, expectedActions);
		done();
		return store.dispatch(editDocument(documentData)).then(() => {
			expect(store.getActions()).to.eql(expectedActions);
		});
	});
});
