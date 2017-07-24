import React from 'react';
import { shallow } from 'enzyme';
import App from '../../src/components/App';

describe('Footer', () => {
	it('renders a snapshot', () => {
		const wrapper = shallow(<App />);
		expect(wrapper).toMatchSnapshot();
	});
});
