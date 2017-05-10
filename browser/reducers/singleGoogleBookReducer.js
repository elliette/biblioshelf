/* ============ CONSTANTS =============== */

const SET_GOOGLE_BOOK = 'SET_GOOGLE_BOOK';
const REMOVE_GOOGLE_BOOK = 'REMOVE_GOOGLE_BOOK';

/* ============ ACTION CREATORS =============== */

export const setGoogleBook = function(book) {
    return {
        type: SET_GOOGLE_BOOK,
        book: book
    };
};

export const removeGoogleBook = function() {
    return {
        type: REMOVE_GOOGLE_BOOK
    };
};

/* ============ REDUCER =============== */

export default function(state = {}, action) {

    let newState = Object.assign({}, state);

    switch (action.type) {
        case SET_GOOGLE_BOOK:
            newState = Object.assign({}, newState, action.book);
            break;
        case REMOVE_GOOGLE_BOOK:
            newState = {};
            break;
        default:
            return state;
    }
    return newState;
}
