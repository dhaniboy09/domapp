import React from 'react';
import { shallow } from 'enzyme';
import Footer from '../../src/components/Footer';

describe('Footer', () => {
	it('renders a snapshot', () => {
		const wrapper = shallow(<Footer />);
		expect(wrapper).toMatchSnapshot();
	});
});
