import { getFirestore } from "redux-firestore";
import firebase from '../../config/fbConfig';

export const createMember = (member) => {
    return async (dispatch, getState, { getFirestore }) => {
        // make database calls3
        const firestore = getFirestore();
        const id = Math.random().toString(36).slice(2);

        await firestore.collection('members1').doc(id).set({
            ...member,
            id         
        });
        // if(res.id != null ){
            dispatch({ type: 'MEMBER_CREATED', payload: member });
            // dispatch({ type: 'MEMBER_ADD_UPDATE_COMPLETED' });
        // } else{
        //     console.log('Creation Failed.')
        // }
    }
};

export const getMembersData = () => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        console.log("HELLO")
        const res = await firestore.collection('members1').get();
        let resArr = [];
        res.forEach(doc => {
            resArr.push(doc.data());
        });
        dispatch({ type: 'GET_MEMBERS', payload: resArr });
        // firestore.collection('members').get().then(snapshot => {
        //     snapshot.forEach(doc => { 
        //         console.log(doc.data());
        //         dispatch({ type: 'GET_MEMBERS', payload: doc.data() }) })
        // });
    }
}

export const updateMember = (member, history) => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        // make database calls3
        const firestore = getFirestore();
        const res = await firestore.collection('members1').doc(member.id).update(member);
        if(!res) {
            dispatch({ type: 'MEMBER_UPDATED', payload: member });
            console.log("hello")
            dispatch({ type: 'MEMBER_ADD_UPDATE_COMPLETED' });
            console.log("hello agaIN")
        }
    }
};