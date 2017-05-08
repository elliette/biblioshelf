/* ============ CONSTANTS =============== */

const AUTHENTICATED = 'AUTHENTICATED';

/* ============ ACTION CREATORS =============== */

export const authenticated = function(user) {
    return {
        type: AUTHENTICATED,
        user: user
    };
};

/* ============ REDUCER =============== */

export default function(state = {}, action) {

    let newState = Object.assign({}, state);

    switch (action.type) {
        case AUTHENTICATED:
            newState = { id: action.user };
            break;
        default:
            return state;
    }
    return newState;
}

