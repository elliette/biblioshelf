import axios from 'axios';
import { browserHistory } from 'react-router';

/* ============ CONSTANTS =============== */

const AUTHENTICATED = 'AUTHENTICATED';

/* ============ ACTION CREATORS =============== */

export const authenticated = function(user) {
    return {
        type: AUTHENTICATED,
        user: user
    };
};

/* ============ ASYNC ACTIONS =============== */

export const whoami = () =>
    dispatch =>
        axios.get('/api/auth/whoami')
        .then(response => {
            const user = response.data;
            dispatch(authenticated(user));
      })
      .catch(failed => dispatch(authenticated(null)));

export const login = (email, password) =>
    dispatch =>
        axios.post('/api/auth/login/local', {email, password})
        .then(() => dispatch(whoami()))
        .catch(() => dispatch(whoami()));

export const logout = () =>
    dispatch =>
        axios.post('/api/auth/logout')
        .then(() => dispatch(whoami()))
        .catch(() => dispatch(whoami()));

export const signup = (name, email, password) =>
    dispatch =>
        axios.post('/api/auth/signup', {name, email, password})
        .then( () => browserHistory.push('/signupsuccess') )
        

/* ============ REDUCER =============== */

export default function(state = null, action) {
    switch (action.type) {
        case AUTHENTICATED:
        return action.user;
    default:
        return state;
    }
}
