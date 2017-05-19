'use strict';

/* ============ FILTERS =============== */

export const HAVE_READ = 'HAVE_READ';
export const TO_READ = 'TO_READ';
export const FILTER_BOOKS = 'FILTER_BOOKS';
export const FAVORITES = 'FAVORITES';
export const BY_YEAR = 'BY_YEAR';
export const BY_MONTH = 'BY_MONTH';

export const QUERIED = 'QUERIED';

// export const readBooks = 'show already read books';
// export const favBooks = 'show favorite books';
// export const byYear = 'group books by year';
// export const byMonth = 'group books by month';
// export const queriedBook = 'queried book';
// export const toReadBooks = 'show to read books';

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

export default (state = HAVE_READ, action) => {

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
