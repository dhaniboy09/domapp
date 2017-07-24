import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import SignInPage from '../../src/components/SignInPage';

const mockStore = configureStore();
const store = mockStore({
	auth: { isAuthenticated: true, user: {} },
	users: { isAuthenticated: false, users: {}, allUsers: {}, userSearch: {}, pagination: [] },
	userDocuments: { documents: [{}], searchResults: [], document: {}, pagination: {}, errors: {} }
});
describe('Home', () => {
	it('renders a snapshot', () => {
		const wrapper = shallow(
			<Provider store={store}>
				<SignInPage />
			</Provider>
		);
		expect(wrapper).toMatchSnapshot();
	});
});
