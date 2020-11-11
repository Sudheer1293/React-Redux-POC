import React from 'react';
import configureMockStore from 'redux-mock-store'
import { configureStore } from './../../store';
import thunk from 'redux-thunk';
import { shallow, mount } from 'enzyme';
import MebersDataTable from '../MemberDataTable';

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

const setUp = () => {
    const wrapper = shallow(<MebersDataTable store={store} />, { context : {}});
    return wrapper;
} 

describe('MebersDataTable', () => {
    it('should render component', () => {
        const wrapper = setUp();
        expect(wrapper).toBeTruthy();
    });
})
