import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import { expect } from 'chai';
import { removeDocument } from '../../src/actions/removeDocument';
import * as types from '../../src/actions/actionTypes';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('async actions', () => {
	beforeEach(() => moxios.install());
	afterEach(() => moxios.uninstall());
	it('creates DELETE_DOCUMENT when deleting a document has been done', (done) => {
		const documentId = 5;
		moxios.stubRequest(`/api/v1/documents/${documentId}`, {
			status: 200,
			response: {
				documentId
			}
		});
		const expectedActions = [
			{ type: types.DELETE_DOCUMENT, documentId }
		];
		const store = mockStore({ documents: [] }, expectedActions);
		done();
		return store.dispatch(removeDocument(documentId)).then(() => {
			expect(store.getActions()).to.eql(expectedActions);
		});
	});
});
