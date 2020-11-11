import { getFirestore } from "redux-firestore";
import firebase from '../../config/fbConfig';

export const createUser = (user, history) => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        // make database calls3
        const firestore = getFirestore();
        await firebase.auth().createUserWithEmailAndPassword(user.email, user.password);
        const res = await firestore.collection('users').add({
            ...user
        });
        if(res.id != null ){
            dispatch({ type: 'USER_CREATED', payload: res.id })
        } else{
            console.log('Creation Failed.')
        }
    }
};

export const getUsersData = () => {
    return async (dispatch, getState, { getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        // firebase.auth().onAuthStatusChanged((user) => {
        //     console.log(user)
        // });
        const res = await firestore.collection('users').get();
        let resArr = [];
        res.forEach(doc => {
            resArr.push(doc.data());
        });            
        dispatch({ type: 'GET_USERS', payload: resArr });
    }   
}