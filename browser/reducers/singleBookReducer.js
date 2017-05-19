'use strict';

/* ============ CONSTANTS =============== */

const SET_BOOK = 'SET_BOOK';
const REMOVE_BOOK = 'REMOVE_BOOK';

/* ============ ACTION CREATORS =============== */

export const setBook = (book) => {
    return {
        type: SET_BOOK,
        book: book
    };
};

export const removeBook = () => {
    return {
        type: REMOVE_BOOK,
    };
};

/* ============ REDUCER =============== */

export default (state = {}, action) => {

    let newState = Object.assign({}, state);

    switch (action.type) {
        case SET_BOOK:
            newState = Object.assign({}, newState, action.book);
            break;
        case REMOVE_BOOK:
            newState = {};
            break;
        default:
            return state;
    }
    return newState;
};
