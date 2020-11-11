import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import firebase from '../../config/fbConfig';
import { createMember, getMembersData, updateMember } from './memberActions';
import { applyMiddleware, compose } from 'redux';
import { reduxFirestore, getFirestore } from 'redux-firestore';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';


let store;
const mockMemberObj = {
    firstName: 'sudheer',
    lastName: 's'
};
// const mockId = 'abc12345de';
// Object.defineProperty(MockFirestore, 'getFirestore', 
//     {   set: () => { return { ...mockMemberObj, id: mockId }},
//         get: () => {data: () => [{ firstName: 'sudheer', lastNamr: 's' }]},
//         update: () => mockMemberObj   
//     }       
// );
// const mockFirebaseObj = {
//     getFirestore
// };

// const middlewares = compose(
//     applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore }))
// );

store = configureStore([thunk])({
    member: 
    {
        members: [],
        membersCreated: false,
        membersUpdated: false
    }
});
// const middlewares = compose(  
//     applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
//     reduxFirestore(firebase),
//     reactReduxFirebase(firebase)
//   );

beforeEach(() => {
    
});

test('create member data', async () => {    
    const getFirestore = {
        data: jest.fn(() => Promise.resolve({ data : [{ firstName: 'sudheer', lastName: 's' }]}))
    };
    const dispatch = jest.fn();
    await createMember(mockMemberObj)(dispatch, null, { getFirestore });
    expect(dispatch).toHaveBeenCalledWith({
         type: 'MEMBER_CREATED', payload: mockMemberObj
    });
    // const mockFn = jest.fn();
    // MockFirestore.getFirestore = jest.fn(() => mockFn );
    // const mockResult = jest.spyOn(MockFirestore, 'getFirestore')
    //                         .mockImplementation(() => [{ firstName: 'sudheer' }]);
    // return store.dispatch(createMember()).then(() => {
    //     expect(store.getActions()).toMatchSnapshot();
    // });
})

test('loads members data', () => {
    return store.dispatch(getMembersData()).then(() => {
        expect(store.getActions()).toMatchSnapshot();
    });
});

test('update data', () => {
    return store.dispatch(updateMember()).then(() => {
        expect(store.getActions().toMatchSnapshot());
    });
});