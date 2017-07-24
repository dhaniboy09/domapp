import React from 'react';
import { assert } from 'chai';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { spy } from 'sinon';
import { DocumentDetails } from '../../src/components/DocumentDetails';


const documentDetails = spy(() => new Promise(() => {}));
const editDocument = spy(() => new Promise(() => {}));
const mockStore = configureStore();
const store = mockStore({
	auth: { isAuthenticated: true,
		user: {
			id: 16,
			firstName: 'Thorsa',
			lastName: 'Asgard',
			email: 'tc@yahoo.com',
			roleId: 2,
			iat: 1500803878,
			exp: 1500886678
		} },
	users: { isAuthenticated: false, users: {}, allUsers: {}, userSearch: {}, pagination: [] },
	userDocuments: { documents: [{}], searchResults: [], document: {}, pagination: {}, errors: {} }
});

describe('Document Details Page', () => {
	const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTYsImZpcnN0TmFtZSI6IlRob3JzYSIsImxhc3ROYW1lIjoiQXNnYXJkIiwiZW1haWwiOiJ0Y0B5YWhvby5jb20iLCJyb2xlSWQiOjIsImlhdCI6MTUwMDgwMzg3OCwiZXhwIjoxNTAwODg2Njc4fQ.43gtNWWNsI5KitrFaj2YjFAD3M2nmPWcRkq8vaoZOfQ';
	localStorage.setItem('token', token);
	localStorage.getItem(token);
	it('should call ComponentDidMount()', () => {
		const componentDidMountSpy = spy(DocumentDetails.prototype, 'componentDidMount');
		mount(
			<Router >
				<Provider store={store}>
					<DocumentDetails
						editDocument={editDocument}
						documentDetails={documentDetails}
						match={{ params: { id: 16 } }}
					/>
				</Provider>
			</Router>
		);
		assert.ok(DocumentDetails.prototype.componentDidMount.calledOnce);
		componentDidMountSpy.restore();
	});
	it('should call componentWillReceiveProps()', () => {
		const componentWillReceivePropsSpy = spy(DocumentDetails.prototype, 'componentWillReceiveProps');
		const wrapper = mount(
			<Router >
				<Provider store={store}>
					<DocumentDetails
						editDocument={editDocument}
						documentDetails={documentDetails}
						match={{ params: { id: 16 } }}
						document={{ userId: 16 }}
					/>
				</Provider>
			</Router>
		);
		wrapper.setProps({ document: [] });
		assert.ok(DocumentDetails.prototype.componentWillReceiveProps.calledOnce);
		componentWillReceivePropsSpy.restore();
	});
	it('should have call onChange and openEditor functions on button click', () => {
		const onChangeSpy = spy(DocumentDetails.prototype, 'onChange');
		const openEditorSpy = spy(DocumentDetails.prototype, 'openEditor');
		const event = { target: { name: 'title', value: 'hoyt' } };
		const wrap = mount(
			<DocumentDetails
				editDocument={editDocument}
				documentDetails={documentDetails}
				match={{ params: { id: 16 } }}
				document={{ userId: 16 }}
			/>
		);
		wrap.setState({ decoded: { id: 16, firstName: 'Thor' }, documents: { userId: 16 } });
		const editDocumentBtn = wrap.find('#btn-editDoc');
		assert.equal(editDocumentBtn.length, 1);
		editDocumentBtn.simulate('click', openEditorSpy);
		assert.ok(openEditorSpy.calledOnce);

		editDocumentBtn.simulate('click');
		wrap.find('input#title').simulate('change', onChangeSpy, event);
		assert.ok(onChangeSpy.calledOnce);
	});
	it('should call closeEditor on button click', () => {
		const closeEditorSpy = spy(DocumentDetails.prototype, 'closeEditor');
		const wrap = mount(
			<DocumentDetails
				editDocument={editDocument}
				documentDetails={documentDetails}
				match={{ params: { id: 16 } }}
				document={{ userId: 16 }}
			/>
		);
		wrap.setState({ decoded: { id: 16, firstName: 'Thor' }, documents: { userId: 16 } });
		const editDocumentBtn = wrap.find('#btn-editDoc');
		editDocumentBtn.simulate('click');

		const closeEditorBtn = wrap.find('#btn-closeEditor');
		closeEditorBtn.simulate('click', closeEditorSpy);
		assert.ok(closeEditorSpy.calledOnce);
	});
	it('should call updateDocument on button click', () => {
		const updateDocumentSpy = spy(DocumentDetails.prototype, 'updateDocument');
		const wrap = mount(
			<DocumentDetails
				editDocument={editDocument}
				documentDetails={documentDetails}
				match={{ params: { id: 16 } }}
				document={{ userId: 16 }}
			/>
		);
		wrap.setState({ decoded: { id: 16, firstName: 'Thor' }, documents: { userId: 16 } });
		wrap.setState({ title: 'hort', content: 'My Hort', access: 'public' });
		const editDocumentBtn = wrap.find('#btn-editDoc');
		editDocumentBtn.simulate('click');

		const updateDocumentBtn = wrap.find('#btn-updateDocument');
		updateDocumentBtn.simulate('click', updateDocumentSpy);
		assert.ok(updateDocumentSpy.calledOnce);
	});
});
