import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import { expect } from 'chai';
import { searchDocuments } from '../../src/actions/searchDocuments';
import * as types from '../../src/actions/actionTypes';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('async actions', () => {
	beforeEach(() => moxios.install());
	afterEach(() => moxios.uninstall());
	it('creates SEARCH_DOCUMENTS when document search has been done', (done) => {
		const documentList = [{
			id: 78,
			title: 'Errand Runners',
			content: 'Hey everyone',
			access: 'public',
			userId: 16,
			userRoleId: 2,
			createdAt: '2017-07-15T15:59:40.262Z',
			updatedAt: '2017-07-15T17:31:48.392Z'
		}];
		const paginationObject = [{
			totalCount: 3,
			pages: 1,
			currentPage: 1,
			pageSize: 4
		}];
		const params = {
			offset: 0,
			limit: 6
		};
		moxios.stubRequest(`/api/v1/search/documents?query=${params.searchQuery}&offset=${params.offset}`, {
			status: 200,
			response: {
				documents: documentList,
				pagination: paginationObject
			}
		});
		const expectedActions = [
			{ type: types.SEARCH_DOCUMENTS, documents: documentList, pagination: paginationObject }
		];
		const store = mockStore({ searchResults: [] }, expectedActions);
		done();
		return store.dispatch(searchDocuments(params)).then(() => {
			expect(store.getActions()).to.eql(expectedActions);
		});
	});
});
