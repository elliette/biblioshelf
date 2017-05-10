/* ============ CONSTANTS =============== */

const SET_BOOK = 'SET_BOOK';

/* ============ ACTION CREATORS =============== */

export const setGoogleBook = function(book) {
    return {
        type: SET_BOOK,
        book: book
    };
};

/* ============ REDUCER =============== */

export default function(state = {}, action) {

    let newState = Object.assign({}, state);

    switch (action.type) {
        case SET_BOOK:
            newState = Object.assign({}, newState, action.book);
            break;
        default:
            return state;
    }
    return newState;
}
