import { CREATE_NEW_DOCUMENT, VIEW_ALL_DOCUMENTS, EDIT_DOCUMENT, DELETE_DOCUMENT, GET_USER_DOCUMENTS } from '../actions/actionTypes';

const initialState = {
	documents: []
};
export default (state = initialState, action) => {
	switch (action.type) {
	case CREATE_NEW_DOCUMENT: {
		const updatedList = [action.document, ...state.documents];
		return Object.assign({}, state, { documents: updatedList });
	}
	case VIEW_ALL_DOCUMENTS:
		return Object.assign({}, state, { documents: action.documents });
	case GET_USER_DOCUMENTS:
		return Object.assign({}, state, { documents: action.documents });
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
		const doc = state.documents.filter((document) => {
			return action.document.id !== document.id;
		});
		return Object.assign({}, state, { documents: doc });
	}
	default: return state;
	}
};

