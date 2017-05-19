'use strict';

/* ============ FILTERS =============== */

export const HAVE_READ = 'HAVE_READ';
export const TO_READ = 'TO_READ';
export const FILTER_BOOKS = 'FILTER_BOOKS';
export const FAVORITES = 'FAVORITES';
export const BY_YEAR = 'BY_YEAR';
export const BY_MONTH = 'BY_MONTH';
export const QUERIED = 'QUERIED';

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
