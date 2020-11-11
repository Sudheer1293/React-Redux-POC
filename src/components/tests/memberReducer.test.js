const initState = {
    members: [],
    memberCreated: false,
    memberUpdated: false,
    membersFetched: false,
};

export default function memberReducer(state=initState, action) {
    switch(action.type) {
        case 'MEMBER_CREATED': 
            return {
                ...state,
                memberCreated: true,
            };
        case 'GET_MEMBERS': 
            return {
                ...state,
                // members: state.members.concat(action.payload),
                membersFetched: true
            };
        case 'MEMBER_UPDATED': 
            // const memberIndex = state.members.findIndex(m => m.id === action.payload.id);
            // state.members.splice(memberIndex, 0, action.payload);
            return {
                ...state,
                memberUpdated: true
            }
        case 'MEMBER_ADD_UPDATE_COMPLETED': 
            return {
                ...state,
                memberCreated: false,
                memberUpdated: false
            }
        default:
            return state ;        
    }
}