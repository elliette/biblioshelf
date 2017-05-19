'use strict';

/* ============ CONSTANTS =============== */

export const SET_QUERIED_BOOKS = 'SET_QUERIED_BOOKS';

/* ============ ACTION CREATORS =============== */

export const setQueriedBooks = function (books) {
    return {
        type: SET_QUERIED_BOOKS,
        books: books
    };
};

export default (state = [], action) => {

    let newState = state.slice();

    switch (action.type) {
        case SET_QUERIED_BOOKS:
            newState = action.books;
            break;
        default:
            return state;
    }
    return newState;
};
