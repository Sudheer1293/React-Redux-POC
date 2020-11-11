import React from 'react';
import configureMockStore from 'redux-mock-store'
import { configureStore } from './../../store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux'
import { shallow, mount } from 'enzyme';
import AddUpdateMember from '../AddUpdateMember';

const store = configureStore();
const storeStateMock = {
    member: {
        members: [],
        memberCreated: false,
        memberUpdated: false,
        membersFetched: false
    }
};

let mockProps = {
        match: {
            params: {
                id: 'aa44aa44'
        },
        currentUser: {
            email: 'testabc@gmail.com'
        },
        updateMember: function() { return },
        createNewMember: function() { return }

    },
    members: [
        {
            id: 'aa44aa44',
            firstName: 'abc',
            lastName: 'def',
            relationship: '',
            dob: '',
            gender: '',
            address: '',
            selectedCity: '',
            selectedState: '',
            zipCode: '',
            phoneNumber: '',
            emailId: '',
            selectedCoverageType: '',
            selectedClient: '',
            benefit: '',
            effectiveDate: '',
            termDate: '',
            formValid: false
        }
    ]
}

const mockStore = configureMockStore([thunk]);

const setUp = (props=mockProps) => {
    const wrapper = shallow(<AddUpdateMember.WrappedComponent store={store} {...props} {...props} />);
    return wrapper;
} 

// const setUp = (props={}) => {    
//     const wrapper = shallow(
//         <Provider store={store}>
//             <AddUpdateMember { ...props }/>
//         </Provider>
//     );
//     return wrapper;
// }

describe('AddUpdateMember', () => {
    // beforeEach(() => {
    //     store1 = mockStore(storeStateMock);
    // });

    it('should render component', () => {
        const wrapper = setUp();
        expect(wrapper).toBeTruthy();
    });

    it('should find the input elements', () => {
        const shallowWrapper = setUp();
        const element = shallowWrapper.find('#firstName');
        expect(element.length).toBe(1);
    });

    it('should call handleChange for for state field', () => {
        const shallowWrapper = setUp();
        const spy = jest.spyOn(shallowWrapper.instance(), "handleChange");
        shallowWrapper.instance().forceUpdate();
        const mockEvent = {
            target: {
            name: "selectedState",
            id: "selectedState",
            value: "AP"
            }
        };
        shallowWrapper.find("#selectedState").simulate("change", mockEvent);
        expect(spy).toHaveBeenCalledWith(mockEvent);
    });

    it('should change the value for city based on state', () => {
        const shallowWrapper = setUp();
        const mockEvent = {
            name: "selectedState",
            id: "selectedState",
            value: "AP"
        };
        const mockState = {
            city: [
                { value: 'AP', cities: [
                    { value: '', display: 'Please select a city'},
                    { value: 'Vizag',display: 'Vizag'}, 
                    { value: 'Rajahmundry', display: 'Rajahmundry'}, 
                    { value: 'Vijayawada', display: 'Vijayawada'}
                    ]
                }
            ]
        };

        // jest.spyOn(shallowWrapper.state(), mockState);
        const expectedCitites = [
            { value: '', display: 'Please select a city'},
            { value: 'Vizag',display: 'Vizag'}, 
            { value: 'Rajahmundry', display: 'Rajahmundry'}, 
            { value: 'Vijayawada', display: 'Vijayawada'}
        ];

        // shallowWrapper.instance().handleChange(mockEvent);
        shallowWrapper.find('select[id="selectedState"]').simulate('change', { target: mockEvent });
        expect(shallowWrapper.state().cityBasedOnState).toEqual(expectedCitites);
    });

    it('should throw required error when relationship field is empty', () => {
        const shallowWrapper = setUp();
        const mockEvent = {
            name: "relationship",
            id: "relationship",
            value: ""
        };
        shallowWrapper.find('input[id="relationship"]').simulate('change', { target: mockEvent });
        expect(shallowWrapper.state().formErrors['relationship']).toEqual("This field is required.");
    });

    it('should throw error when firstname contains numbers', () => {
        const shallowWrapper = setUp();
        const mockEvent = {
            name: "firstName",
            id: "firstName",
            value: "abc123"
        };
        shallowWrapper.find('input[id="firstName"]').simulate('change', { target: mockEvent });
        expect(shallowWrapper.state().formErrors['firstName']).toEqual("Name should contain only alphabets and space.");
    });

    it('should throw error when emailid is incorrect', () => {
        const shallowWrapper = setUp();
        const mockEvent = {
            name: "emailId",
            id: "emailId",
            value: "abc123"
        };
        shallowWrapper.find('input[id="emailId"]').simulate('change', { target: mockEvent });
        expect(shallowWrapper.state().formErrors['emailId']).toEqual("Email address is invalid.");
    });

    it('should throw error when phone number is incorrect', () => {
        const shallowWrapper = setUp();
        const mockEvent = {
            name: "phoneNumber",
            id: "phoneNumber",
            value: "123"
        };
        shallowWrapper.find('input[id="phoneNumber"]').simulate('change', { target: mockEvent });
        expect(shallowWrapper.state().formErrors['phoneNumber']).toEqual("Contact number should contain 10 digits.");
    });

    it("should call preventDefault", () => {
        const shallowWrapper = setUp();
        const mockPreventDefault = jest.fn();
        const mockEvent = {
          preventDefault: mockPreventDefault
        };
        shallowWrapper.instance().handleSubmit(mockEvent);
        expect(mockPreventDefault).toHaveBeenCalled();
        expect(mockProps.createNewMember()).toHaveBeenCalled();
      });
});