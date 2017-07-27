import React from 'react';
import { mount } from 'enzyme';
import { assert } from 'chai';
import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';
import { spy } from 'sinon';
import configureStore from 'redux-mock-store';
import { SignUpForm } from '../../src/components/SignUpForm';

const mockStore = configureStore();
const store = mockStore({
	auth: { isAuthenticated: true, user: {} },
	users: { isAuthenticated: false, users: {}, allUsers: {}, userSearch: {}, pagination: [] },
	userDocuments: { documents: [{}], searchResults: [], document: {}, pagination: {}, errors: {} }
});
describe('SignUpForm', () => {
	it('should call onChange', () => {
		const onChangeSpy = spy(SignUpForm.prototype, 'onChange');
		const event = { target: { name: 'title', value: 'hoyt' } };
		const wrap = mount(
			<Router>
				<SignUpForm />
			</Router>
		);
		wrap.find('input#firstName').simulate('change', onChangeSpy, event);
		assert.ok(onChangeSpy.calledOnce);
	});
	it('should call onSubmit', () => {
		const onSubmitSpy = spy(SignUpForm.prototype, 'onSubmit');
		const wrap = mount(
			<Router>
				<SignUpForm />
			</Router>
		);
		wrap.find('#btn-signup').simulate('click', onSubmitSpy);
		assert.ok(onSubmitSpy.calledOnce);
	});
});
