import React from 'react';
import { assert } from 'chai';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { spy } from 'sinon';
import { MyDocuments } from '../../src/components/MyDocuments';
import dummyData from '../../__mocks__/dummyData';

const myDocumentsMock = jest.fn();
const mockStore = configureStore();
const store = mockStore({
	auth: { isAuthenticated: true, user: {} },
	users: { isAuthenticated: false, users: {}, allUsers: {}, userSearch: {}, pagination: [] },
	userDocuments: { documents: [{}], searchResults: [], document: {}, pagination: {}, errors: {} }
});

describe('My Documents Page', () => {
	it('should call ComponentDidMount()', () => {
		const componentDidMountSpy = spy(MyDocuments.prototype, 'componentDidMount');
		mount(
			<Router >
				<Provider store={store}>
					<MyDocuments
						pagination={dummyData.pagination}
						documents={[]}
						myDocuments={myDocumentsMock}
						errors={[]}
						auth={{ user: { id: 16 } }}
					/>
				</Provider>
			</Router>
		);
		assert.ok(MyDocuments.prototype.componentDidMount.calledOnce);
		componentDidMountSpy.restore();
	});
	it('should call componentWillReceiveProps()', () => {
		const componentWillReceivePropsSpy = spy(MyDocuments.prototype, 'componentWillReceiveProps');
		const wrapper = mount(
			<Router >
				<Provider store={store}>
					<MyDocuments
						pagination={dummyData.pagination}
						documents={[]}
						myDocuments={myDocumentsMock}
						errors={[]}
						auth={{ user: { id: 16 } }}
					/>
				</Provider>
			</Router>
		);
		wrapper.setProps({ documents: [] });
		assert.ok(MyDocuments.prototype.componentWillReceiveProps.calledOnce);
		componentWillReceivePropsSpy.restore();
	});
	it('should call openModal() when modal event is triggered', () => {
		const wrapper = mount(
			<Router >
				<Provider store={store}>
					<MyDocuments
						pagination={dummyData.pagination}
						documents={[]}
						myDocuments={myDocumentsMock}
						errors={[]}
						auth={{ user: { id: 16 } }}
					/>
				</Provider>
			</Router>
		);
		const openModalButton = wrapper.find('#btn-openModal');
		const closeModalButton = wrapper.find('#btn-createdocument');
		assert.equal(openModalButton.length, 1);
		openModalButton.simulate('click');
		assert.equal(closeModalButton.length, 1);
		closeModalButton.simulate('click');
	});
	it('Should render a ReactPaginate component', () => {
		const wrapper = mount(
			<Router >
				<Provider store={store}>
					<MyDocuments
						pagination={dummyData.pagination}
						documents={dummyData.documents}
						myDocuments={myDocumentsMock}
						errors={[]}
						auth={{ user: { id: 16 } }}
					/>
				</Provider>
			</Router>
		);
		const nextButton = wrapper.find('#btn-Next');
		assert.equal(nextButton.length, 1);
	});
});
