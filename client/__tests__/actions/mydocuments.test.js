import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import { expect } from 'chai';
import { myDocuments } from '../../src/actions/myDocuments';
import * as types from '../../src/actions/actionTypes';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('async actions', () => {
	beforeEach(() => moxios.install());
	afterEach(() => moxios.uninstall());
	it('creates GET_USER_DOCUMENTS when fetching all user documents has been done', (done) => {
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
		moxios.stubRequest(`/api/v1/users/${params.id}/documents?offset=${params.offset}`, {
			status: 200,
			response: {
				documents: documentList,
				pagination: paginationObject
			}
		});
		const expectedActions = [
			{ type: types.GET_USER_DOCUMENTS, documents: documentList, pagination: paginationObject }
		];
		const store = mockStore({ documents: [] }, expectedActions);
		done();
		return store.dispatch(myDocuments(params)).then(() => {
			expect(store.getActions()).to.eql(expectedActions);
		});
	});
});
