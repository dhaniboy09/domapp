import { CREATE_NEW_DOCUMENT, VIEW_ALL_DOCUMENTS,
	EDIT_DOCUMENT, DELETE_DOCUMENT, GET_USER_DOCUMENTS, SEARCH_DOCUMENTS } from '../actions/actionTypes';

const initialState = {
	documents: [],
	searchResults: [],
	pagination: []
};
export default (state = initialState, action) => {
	switch (action.type) {
	case CREATE_NEW_DOCUMENT: {
		const updatedList = [action.document, ...state.documents];
		return Object.assign({}, state, { documents: updatedList });
	}
	case VIEW_ALL_DOCUMENTS:
		return Object.assign({}, state, { documents: action.documents, pagination: action.pagination });
	case GET_USER_DOCUMENTS:
		return Object.assign({}, state, { documents: action.documents, pagination: action.pagination });
	case EDIT_DOCUMENT: {
		// const updatedList = state.documents.filter(document => action.document.id !== document.id);
		// return Object.assign({}, state, { documents: updatedList });
		// return [...state.documents, action.document];
		const updatedList = [action.document, ...state.documents];
		return Object.assign({}, state, { documents: updatedList });
	}
	case DELETE_DOCUMENT: {
		// const updatedList = state.documents.filter(document => action.document.id !== document.id);
		// return Object.assign({}, state, { documents: updatedList });
		const filteredDocuments = state.documents.filter((document) => {
			return action.document.id !== document.id;
		});
		return Object.assign({}, state, { documents: filteredDocuments });
	}
	case SEARCH_DOCUMENTS: {
		// const updatedList = [action.documents, ...state.searchResults];
		// return Object.assign({}, state, { searchResults: updatedList });
		// Object.assign(state.searchResults, action.documents);
		// return Object.assign({}, state.searchResults, action.documents);
		return {
			searchResults: action.documents
		};
	}
	default: return state;
	}
};

