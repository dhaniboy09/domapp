import React from 'react';
import { assert } from 'chai';
import { spy } from 'sinon';
import { mount, shallow } from 'enzyme';
import { DocumentForm } from '../../src/components/DocumentForm';

const newDocumentMock = jest.fn();
const allDocumentsMock = () => {};
const closeModal = jest.fn();

describe('Document Form', () => {
	it('renders a snapshot', () => {
		const wrapper = shallow(<DocumentForm />);
		expect(wrapper).toMatchSnapshot();
	});
	it('should have an onChange function', () => {
		const onChangeSpy = spy(DocumentForm.prototype, 'onChange');
		const event = { target: { name: 'title', value: 'hoyt' } };
		const wrap = mount(
			<DocumentForm />
		);
		wrap.find('input#title').simulate('change', onChangeSpy, event);
		assert.ok(onChangeSpy.calledOnce);
	});
	it('should have an onEditorChange() function', () => {
		const wrapper = shallow(<DocumentForm />);
		const onEditorChange = jest.fn();
		const event = { target: { content: 'john', getContent: () => {} } };
		const tinymceWrapper = wrapper.find('TinyMCE');
		wrapper.update();
		tinymceWrapper.simulate('change', event);
		expect(onEditorChange).not.toBeCalledWith('Hoyt');
	});
	it('should have a createDocument() function', () => {
		const wrapper = mount(
			<DocumentForm
				newDocument={newDocumentMock}
				allDocuments={allDocumentsMock}
				closeModal={closeModal}
			/>
		);
		const button = wrapper.find('#btn-createdocument');
		button.simulate('click');
		assert.equal(button.length, 1);
	});
});
