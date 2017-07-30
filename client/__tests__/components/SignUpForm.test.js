import React from 'react';
import { mount } from 'enzyme';
import { assert } from 'chai';
import { MemoryRouter as Router } from 'react-router-dom';
import { spy } from 'sinon';
import { SignUpForm } from '../../src/components/SignUpForm';

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
