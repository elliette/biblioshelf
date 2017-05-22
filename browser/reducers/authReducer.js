'use strict';
import axios from 'axios';
import { clearBooks} from './booksReducer';
import { removeBook } from './singleBookReducer';

/* ============ CONSTANTS =============== */

const AUTHENTICATED = 'AUTHENTICATED';

/* ============ ACTION CREATORS =============== */

export const authenticated = function(user) {
    return {
        type: AUTHENTICATED,
        user: user
    };
};

/* ============ REDUCER =============== */

export default (state = {}, action) => {

    let newState = Object.assign({}, state);

    switch (action.type) {
        case AUTHENTICATED:
            newState = { id: action.user };
            break;
        default:
            return state;
    }
    return newState;
};

/* ============ DISPATCHERS =============== */

export const logout = () => {
    return (dispatch) =>  {
        axios.post('/api/auth/logout')
        .then(() => dispatch(clearBooks()))
        .then(() => dispatch(removeBook()))
        .then(() => dispatch(authenticated(null)))
        .then(() => window.location.replace('/'));
    };
};
