import React from 'react';
import { mount } from 'enzyme';
import { assert } from 'chai';
import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';
import { spy } from 'sinon';
import configureStore from 'redux-mock-store';
import { SignInForm } from '../../src/components/SignInForm';

const mockStore = configureStore();
const store = mockStore({
	auth: { isAuthenticated: true, user: {} },
	users: { isAuthenticated: false, users: {}, allUsers: {}, userSearch: {}, pagination: [] },
	userDocuments: { documents: [{}], searchResults: [], document: {}, pagination: {}, errors: {} }
});
describe('SignInForm', () => {
	it('should call onChange', () => {
		const onChangeSpy = spy(SignInForm.prototype, 'onChange');
		const event = { target: { name: 'title', value: 'hoyt' } };
		const wrap = mount(
			<Router>
				<SignInForm />
			</Router>
		);
		wrap.find('input#email').simulate('change', onChangeSpy, event);
		assert.ok(onChangeSpy.calledOnce);
	});
	it('should call onSubmit', () => {
		const onSubmitSpy = spy(SignInForm.prototype, 'onSubmit');
		const e = { preventDefault: () => {} };
		const wrap = mount(
			<Router>
				<SignInForm />
			</Router>
		);
		wrap.find('#button-signin').simulate('click', onSubmitSpy);
		assert.ok(onSubmitSpy.calledOnce);
	});
});
