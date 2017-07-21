import axios from 'axios';
import { DOCUMENT_DETAILS } from './actionTypes';

/**
 * @description Dispatches action to get a single document
 * @param  {object} document
 * @return {object}
 */
export const getSingleDocuments = (document) => {
	return {
		type: DOCUMENT_DETAILS,
		document
	};
};

/**
 * @param  {object} documentId
 * @return {function} dispatch
 */
export const documentDetails = (documentId) => {
	return dispatch => {
		return axios.get(`/api/v1/documents/${documentId}`).then((res) => {
			dispatch(getSingleDocuments(res.data.foundDocument));
			return Promise.resolve(res);
		});
	};
};
