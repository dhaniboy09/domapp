import React from 'react';
import { assert } from 'chai';
import { spy } from 'sinon';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { MemoryRouter as Router } from 'react-router-dom';
import { mount } from 'enzyme';
import { UpdatePasswordForm } from '../../src/components/UpdatePasswordForm';

const updatePasswordMock = spy(() => new Promise(() => {}));
const deactivateAccountMock = spy(() => new Promise(() => {}));
const isAuthenticated = true;
const mockStore = configureStore();
const store = mockStore({
	auth: { isAuthenticated: true, user: {} },
	users: { isAuthenticated: true, users: {}, allUsers: {}, userSearch: {}, pagination: [] },
	userDocuments: { documents: [{}], searchResults: [], document: {}, pagination: {}, errors: {} }
});

describe('UpdatePasswordForm', () => {
	const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTYsImZpcnN0TmFtZSI6IlRob3JzYSIsImxhc3ROYW1lIjoiQXNnYXJkIiwiZW1haWwiOiJ0Y0B5YWhvby5jb20iLCJyb2xlSWQiOjIsImlhdCI6MTUwMDgwMzg3OCwiZXhwIjoxNTAwODg2Njc4fQ.43gtNWWNsI5KitrFaj2YjFAD3M2nmPWcRkq8vaoZOfQ';
	localStorage.setItem('token', token);
	localStorage.getItem(token);
	it('should call onChange function when onChange event is triggered', () => {
		const onChangeSpy = spy(UpdatePasswordForm.prototype, 'onChange');
		const event = { target: { name: 'password', value: '12345567899' } };
		const wrap = mount(
			<Router >
				<Provider store={store}>
					<UpdatePasswordForm
						updatePassword={updatePasswordMock}
						deactivateAccount={deactivateAccountMock}
						auth={{ isAuthenticated }}
					/>
				</Provider>
			</Router>
		);
		wrap.find('input#password').simulate('change', onChangeSpy, event);
		assert.ok(onChangeSpy.calledOnce);
	});
	it('should call ComponentWillMount()', () => {
		const componentWillMountSpy = spy(UpdatePasswordForm.prototype, 'componentWillMount');
		mount(
			<Router >
				<Provider store={store}>
					<UpdatePasswordForm
						updatePassword={updatePasswordMock}
						deactivateAccount={deactivateAccountMock}
						auth={{ isAuthenticated }}
					/>
				</Provider>
			</Router>
		);
		assert.ok(UpdatePasswordForm.prototype.componentWillMount.calledOnce);
		componentWillMountSpy.restore();
	});
	it('should call updatePassword on button click', () => {
		const updatePasswordSpy = spy(UpdatePasswordForm.prototype, 'updatePassword');
		const wrapper = mount(
			<Router >
				<Provider store={store}>
					<UpdatePasswordForm
						updatePassword={updatePasswordMock}
						deactivateAccount={deactivateAccountMock}
						auth={{ isAuthenticated }}
					/>
				</Provider>
			</Router>
		);
		const button = wrapper.find('#btn-updatePassword');
		button.simulate('click');
		assert.equal(button.length, 1);
		assert.ok(updatePasswordSpy.calledOnce);
	});
});
