import firebase from '../../config/fbConfig';

export const loginUser = (userObj) => {
    return async (dispatch, getState) => {
        try {
            const user = await firebase.auth().signInWithEmailAndPassword(userObj.email, userObj.password);
            if(user) {
                dispatch({ type: 'LOGIN_USER', payload: user});            
                return true;
            }          
        }
        catch (e) {
            console.log(e)
            return e;
        }

    }
}

export const currentUser = (userObj) => {
    return async (dispatch, getState) => {
        dispatch({ type: 'CURRENT_USER', payload: userObj});
    }
}

export const logout = () => {
    return async (dispatch, getState) => {
        firebase.auth().signOut();
        dispatch({ type: 'LOGOUT_USER'});       
    };
}