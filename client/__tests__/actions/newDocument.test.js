import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import { expect } from 'chai';
import { newDocument } from '../../src/actions/newDocument';
import * as types from '../../src/actions/actionTypes';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('async actions', () => {
	beforeEach(() => moxios.install());
	afterEach(() => moxios.uninstall());
	it('creates CREATE_NEW_DOCUMENT when editing a document', (done) => {
		const documentData = [{
			title: 'Errand Runners',
			content: 'Hey everyone',
			access: 'public',
			userId: 16,
			userRoleId: 2,
		}];
		moxios.stubRequest('/api/v1/documents', documentData, {
			status: 200,
			response: {
				document: documentData
			}
		});
		const expectedActions = [
			{ type: types.CREATE_NEW_DOCUMENT, document }
		];
		const store = mockStore({ documents: [] }, expectedActions);
		done();
		return store.dispatch(newDocument(documentData)).then(() => {
			expect(store.getActions()).to.eql(expectedActions);
		});
	});
});
