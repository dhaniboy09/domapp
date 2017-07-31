import React from 'react';
import { mount } from 'enzyme';
import { assert } from 'chai';
import { MemoryRouter as Router } from 'react-router-dom';
import { spy } from 'sinon';
import { SignInForm } from '../../src/components/SignInForm';

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
		const wrap = mount(
			<Router>
				<SignInForm />
			</Router>
		);
		wrap.find('#button-signin').simulate('click', onSubmitSpy);
		assert.ok(onSubmitSpy.calledOnce);
	});
});
