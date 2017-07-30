import React from 'react';
import { assert } from 'chai';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { spy } from 'sinon';
import { Documents } from '../../src/components/Documents';
import dummyData from '../../__mocks__/dummyData';


const allDocumentsMock = jest.fn();
const mockStore = configureStore();
const store = mockStore({
	auth: { isAuthenticated: true, user: {} },
	users: { isAuthenticated: false, users: {}, allUsers: {}, userSearch: {}, pagination: [] },
	userDocuments: { documents: [{}], searchResults: [], document: {}, pagination: {}, errors: {} }
});

describe('Documents Page', () => {
	it('should call ComponentDidMount()', () => {
		const componentDidMountSpy = spy(Documents.prototype, 'componentDidMount');
		mount(
			<Router >
				<Provider store={store}>
					<Documents
						pagination={dummyData.pagination}
						documents={[]}
						allDocuments={allDocumentsMock}
						errors={[]}
					/>
				</Provider>
			</Router>
		);
		assert.ok(Documents.prototype.componentDidMount.calledOnce);
		componentDidMountSpy.restore();
	});
	it('should call componentWillReceiveProps()', () => {
		const componentWillReceivePropsSpy = spy(Documents.prototype, 'componentWillReceiveProps');
		const wrapper = mount(
			<Router >
				<Provider store={store}>
					<Documents
						pagination={dummyData.pagination}
						documents={[]}
						allDocuments={allDocumentsMock}
						errors={[]}
					/>
				</Provider>
			</Router>
		);
		wrapper.setProps({ documents: [] });
		assert.ok(Documents.prototype.componentWillReceiveProps.calledOnce);
		componentWillReceivePropsSpy.restore();
	});
	it('should call openModal() when modal event is triggered', () => {
		const openModalSpy = spy(Documents.prototype, 'openModal');
		const wrapper = mount(
			<Router >
				<Provider store={store}>
					<Documents
						pagination={dummyData.pagination}
						documents={[]}
						allDocuments={allDocumentsMock}
						errors={[]}
					/>
				</Provider>
			</Router>
		);
		const openModalButton = wrapper.find('#btn-newModal');
		assert.equal(openModalButton.length, 1);
		openModalButton.simulate('click', openModalSpy);
		assert.ok(openModalSpy.calledOnce);
	});
	it('should call closeModal() when modal event is triggered', () => {
		const closeModalSpy = spy(Documents.prototype, 'closeModal');
		const wrapper = mount(
			<Router >
				<Provider store={store}>
					<Documents
						pagination={dummyData.pagination}
						documents={[]}
						allDocuments={allDocumentsMock}
						errors={[]}
					/>
				</Provider>
			</Router>
		);
		const closeModalButton = wrapper.find('#btn-createdocument');
		assert.equal(closeModalButton.length, 1);
		closeModalButton.simulate('click', closeModalSpy('close'));
		assert.ok(closeModalSpy.calledOnce);
	});
	it('Should render a ReactPaginate component', () => {
		const wrapper = mount(
			<Router >
				<Provider store={store}>
					<Documents
						pagination={dummyData.pagination}
						documents={dummyData.documents}
						allDocuments={allDocumentsMock}
						errors={[]}
					/>
				</Provider>
			</Router>
		);
		const nextButton = wrapper.find('#btn-Next');
		assert.equal(nextButton.length, 1);
	});
});
