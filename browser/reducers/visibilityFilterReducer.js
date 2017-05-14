/* ============ CONSTANTS =============== */

const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';

/* ============ ACTION CREATORS =============== */

export const setVisibility = function(filter) {
    return {
        type: SET_VISIBILITY_FILTER,
        filter: filter
    };
};

/* ============ REDUCER =============== */

export default function(state = 'show all books', action) {

    let newState = state.slice(0);

    switch (action.type) {
        case SET_VISIBILITY_FILTER:
            newState = action.filter;
            break;
        default:
            return state;
    }
    return newState;
}
