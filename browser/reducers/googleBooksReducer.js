'use strict';

/* ============ CONSTANTS =============== */

export const SET_GOOGLE_BOOKS = 'SET_GOOGLE_BOOKS';

/* ============ ACTION CREATORS =============== */

export const setGoogleBooks = function (books) {
    return {
        type: SET_GOOGLE_BOOKS,
        books: books
    };
};

export default (state = [], action) => {

    let newState = state.slice();

    switch (action.type) {
        case SET_GOOGLE_BOOKS:
            newState = action.books;
            break;
        default:
            return state;
    }
    return newState;
};
