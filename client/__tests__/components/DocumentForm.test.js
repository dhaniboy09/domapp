import React from 'react';
import { assert } from 'chai';
import { mount, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import renderer from 'react-test-renderer';
import sinon from 'sinon';
import { DocumentForm } from '../../src/components/DocumentForm';

const newDocumentMock = jest.fn();
const allDocumentsMock = () => {};
const closeModal = jest.fn();
const createDocument = jest.fn();
const mockStore = configureStore();
const store = mockStore({
	auth: { isAuthenticated: true, user: {} },
	users: { isAuthenticated: false, users: {}, allUsers: {}, userSearch: {}, pagination: [] },
	userDocuments: { documents: [{}], searchResults: [], document: {}, pagination: {}, errors: {} }
});
const document = [
	{
		id: 114,
		title: 'true colors',
		content: '<p>I see your true colors</p>',
		access: 'public',
		userId: 16,
		userRoleId: 2,
		createdAt: '2017-07-21T14:53:12.916Z',
		updatedAt: '2017-07-21T14:53:12.916Z'
	}
];

describe('Document Form', () => {
	it('renders a snapshot', () => {
		const wrapper = shallow(<DocumentForm />);
		expect(wrapper).toMatchSnapshot();
	});
	it('should have an onChange function', () => {
		const value = 'Hoyt';
		const onChange = jest.fn();
		const wrapper = shallow(<DocumentForm onChange={onChange} />);
		wrapper.find('#title').simulate('change', {
			target: { value }
		});
		expect(onChange).not.toBeCalledWith(value);
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
