'use strict';

/* ============ FILTERS =============== */

export const allBooks = 'show all books';
export const favBooks = 'show favorite books';
export const byYear = 'group books by year';
export const byMonth = 'group books by month';
export const queriedBook = 'queried book';

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

export default (state = 'show all books', action) => {

    let newState = state.slice(0);

    switch (action.type) {
        case SET_VISIBILITY_FILTER:
            newState = action.filter;
            break;
        default:
            return state;
    }
    return newState;
};
