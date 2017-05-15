'use strict';

/* ============ CONSTANTS =============== */

const SET_BOOK = 'SET_BOOK';

/* ============ ACTION CREATORS =============== */

export const setBook = function(book) {
    return {
        type: SET_BOOK,
        book: book
    };
};

/* ============ REDUCER =============== */

export default (state = {}, action) => {

    let newState = Object.assign({}, state);

    switch (action.type) {
        case SET_BOOK:
            newState = Object.assign({}, newState, action.book);
            break;
        default:
            return state;
    }
    return newState;
};
