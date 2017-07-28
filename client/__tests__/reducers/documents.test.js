import { expect } from 'chai';
import { CREATE_NEW_DOCUMENT, VIEW_ALL_DOCUMENTS, EDIT_DOCUMENT, DELETE_DOCUMENT } from '../../src/actions/actionTypes';
import reducer from '../../src/reducers/documents';
import mockData from '../../../server/test/mockData';

describe('Documents reducer', () => {
	it('should return the initial state', () => {
		expect(reducer(undefined, {})).to.eql(
			{
				documents: [],
				searchResults: [],
				document: {},
				pagination: {},
			}
		);
	});
	it('should handle VIEW_ALL_DOCUMENTS', () => {
		expect(
			reducer({}, {
				type: VIEW_ALL_DOCUMENTS,
				documents: mockData.FakeDocumentList,
				pagination: mockData.FakePagination
			})
		).to.eql({
			documents: mockData.FakeDocumentList,
			pagination: mockData.FakePagination
		});
	});
	it('should handle CREATE_NEW_DOCUMENT', () => {
		expect(
			reducer({}, {
				type: CREATE_NEW_DOCUMENT,
				document: mockData.FakePublicDocument
			})
		).to.eql({
			documents: [mockData.FakePublicDocument]
		});
	});
	it('should handle EDIT_DOCUMENT', () => {
		expect(
			reducer({ document: [mockData.FakePublicDocument] }, {
				type: EDIT_DOCUMENT,
				document: mockData.FakePublicDocument
			})
		).to.eql({
			document: mockData.FakePublicDocument
		});
	});
	it('should handle DELETE_DOCUMENT', () => {
		expect(
			reducer({ documents: [mockData.FakeTestDocument01, mockData.FakeTestDocument02] }, {
				type: DELETE_DOCUMENT,
				documentId: mockData.FakeTestDocument01.id
			})
		).to.eql({
			documents: [mockData.FakeTestDocument02]
		});
	});
});
