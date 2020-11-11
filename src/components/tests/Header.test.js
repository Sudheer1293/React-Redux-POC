import React from 'react';
import configureMockStore from 'redux-mock-store'
import { configureStore } from './../../store';
import thunk from 'redux-thunk';
import { shallow, mount } from 'enzyme';
import Header from '../Header';
import { Provider } from 'react-redux';

const store = configureStore();
const storeStateMock = {
    member: {
        members: [],
        memberCreated: false,
        memberUpdated: false,
        membersFetched: false
    }
};

const mockStore = configureMockStore([thunk]);

// const setUp = () => {
//     const wrapper = shallow(<Header store={store} />);
//     return wrapper;
// } 

const wrapper = mount(<Header store={store} />);

describe('Header', () => {
    it('should render component', () => {
        // const wrapper = setUp();
        expect(wrapper).toBeTruthy();
    });
})
