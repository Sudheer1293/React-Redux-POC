const initState = {
    userLoggedIn: false,
    currentUser: {}
};

const authReducer = (state=initState, action) => {
    switch(action.type) {   
        case 'LOGIN_USER': 
            return  {
                ...state,
                userLoggedIn: !!action.payload
            }
        case 'LOGOUT_USER': 
            return {
                ...state,
                userLoggedIn: false
            }
        case 'CURRENT_USER':
            return {
                ...state,
                currentUser: action.payload
            }
        default: 
            break;
    }
    return state;
}

export default authReducer;