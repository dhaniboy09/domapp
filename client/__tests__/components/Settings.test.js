import React from 'react';
import { shallow } from 'enzyme';
import Settings from '../../src/components/Settings';

describe('Footer', () => {
	it('renders a snapshot', () => {
		const wrapper = shallow(<Settings />);
		expect(wrapper).toMatchSnapshot();
	});
});
