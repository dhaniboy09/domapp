import { CREATE_NEW_DOCUMENT, VIEW_ALL_DOCUMENTS,
	EDIT_DOCUMENT, DELETE_DOCUMENT, GET_USER_DOCUMENTS, SEARCH_DOCUMENTS,
	DOCUMENT_DETAILS } from '../actions/actionTypes';

const initialState = {
	documents: [],
	searchResults: [],
	document: {},
	pagination: {},
};
export default (state = initialState, action) => {
	switch (action.type) {
	case CREATE_NEW_DOCUMENT: {
		const { documents = [] } = state;
		const updatedList = [action.document, ...documents];
		return Object.assign({}, state, { documents: updatedList });
	}
	case VIEW_ALL_DOCUMENTS:
		return Object.assign({}, state, { documents: action.documents, pagination: action.pagination });
	case GET_USER_DOCUMENTS:
		return Object.assign({}, state, { documents: action.documents, pagination: action.pagination });
	case EDIT_DOCUMENT: {
		return Object.assign({}, state, { document: action.document });
	}
	case DELETE_DOCUMENT: {
		const { documents = [] } = state;
		const filteredDocuments = documents.filter(document =>
			document.id !== action.documentId);
		return Object.assign({}, state, { documents: filteredDocuments });
	}
	case DOCUMENT_DETAILS: {
		return Object.assign({}, state, { document: action.document });
	}
	case SEARCH_DOCUMENTS: {
		return {
			searchResults: action.documents,
			pagination: action.pagination
		};
	}
	default: return state;
	}
};

