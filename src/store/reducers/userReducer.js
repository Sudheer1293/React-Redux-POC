const initState = {
    users: [],
    userCreated: false, 
};

const userReducer = (state=initState, action) => {
    switch(action.type) {
        case 'USER_CREATED':
            return { 
                ...state,
                userCreated: !!action.payload
            };
        case 'GET_USERS': 
            return {
                ...state,
                users: action.payload
            };
        default: 
            return {...state};
    }
}

export default userReducer;