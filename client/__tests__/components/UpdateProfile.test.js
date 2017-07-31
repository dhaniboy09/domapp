import React from 'react';
import { assert } from 'chai';
import { spy } from 'sinon';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { MemoryRouter as Router } from 'react-router-dom';
import { mount } from 'enzyme';
import { UpdateProfileForm } from '../../src/components/UpdateProfileForm';

const updateProfileMock = spy(() => new Promise(() => {}));
const fetchUserMock = spy(() => new Promise(() => {}));
const mockStore = configureStore();
const store = mockStore({
	auth: { isAuthenticated: true, user: {} },
	users: { isAuthenticated: true, users: {}, allUsers: {}, userSearch: {}, pagination: [] },
	userDocuments: { documents: [{}], searchResults: [], document: {}, pagination: {}, errors: {} }
});

describe('UpdateProfileForm', () => {
	const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTYsImZpcnN0TmFtZSI6IlRob3JzYSIsImxhc3ROYW1lIjoiQXNnYXJkIiwiZW1haWwiOiJ0Y0B5YWhvby5jb20iLCJyb2xlSWQiOjIsImlhdCI6MTUwMDgwMzg3OCwiZXhwIjoxNTAwODg2Njc4fQ.43gtNWWNsI5KitrFaj2YjFAD3M2nmPWcRkq8vaoZOfQ';
	localStorage.setItem('token', token);
	localStorage.getItem(token);
	it('should call onChange function when onChange event is triggered', () => {
		const onChangeSpy = spy(UpdateProfileForm.prototype, 'onChange');
		const event = { target: { name: 'email', value: 'e@m.com' } };
		const wrap = mount(
			<Router >
				<Provider store={store}>
					<UpdateProfileForm
						updateProfile={updateProfileMock}
						fetchUser={fetchUserMock}
					/>
				</Provider>
			</Router>
		);
		wrap.find('input#email').simulate('change', onChangeSpy, event);
		assert.ok(onChangeSpy.calledOnce);
	});
	it('should call ComponentWillMount()', () => {
		const componentWillMountSpy = spy(UpdateProfileForm.prototype, 'componentWillMount');
		mount(
			<Router >
				<Provider store={store}>
					<UpdateProfileForm
						updateProfile={updateProfileMock}
						fetchUser={fetchUserMock}
					/>
				</Provider>
			</Router>
		);
		assert.ok(UpdateProfileForm.prototype.componentWillMount.calledOnce);
		componentWillMountSpy.restore();
	});
	it('should call updateProfile on button click', () => {
		const updateProfileSpy = spy(UpdateProfileForm.prototype, 'updateProfile');
		const wrapper = mount(
			<Router >
				<Provider store={store}>
					<UpdateProfileForm
						updateProfile={updateProfileMock}
						fetchUser={fetchUserMock}
					/>
				</Provider>
			</Router>
		);
		const editButton = wrapper.find('#btn-Edit');
		editButton.simulate('click');

		wrapper.find('input#email').simulate('change');

		const updateButton = wrapper.find('#btn-Update');
		updateButton.simulate('click');
		assert.equal(updateButton.length, 1);
		assert.ok(updateProfileSpy.calledOnce);
	});
	it('should call cancelEdit on button click', () => {
		const cancelEditSpy = spy(UpdateProfileForm.prototype, 'cancelEdit');
		const wrapper = mount(
			<Router >
				<Provider store={store}>
					<UpdateProfileForm
						updateProfile={updateProfileMock}
						fetchUser={fetchUserMock}
					/>
				</Provider>
			</Router>
		);
		const editButton = wrapper.find('#btn-Edit');
		editButton.simulate('click');

		const cancelButton = wrapper.find('#btn-Cancel');
		cancelButton.simulate('click');
		assert.equal(cancelButton.length, 1);
		assert.ok(cancelEditSpy.calledOnce);
	});
	it('should call editProfile on button click', () => {
		const editProfileSpy = spy(UpdateProfileForm.prototype, 'editProfile');
		const wrapper = mount(
			<Router >
				<Provider store={store}>
					<UpdateProfileForm
						updateProfile={updateProfileMock}
						fetchUser={fetchUserMock}
					/>
				</Provider>
			</Router>
		);
		const button = wrapper.find('#btn-Edit');
		button.simulate('click');
		assert.equal(button.length, 1);
		assert.ok(editProfileSpy.calledOnce);
	});
});
