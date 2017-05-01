import axios from 'axios';

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

export const login = (username, password) =>
    dispatch =>
        axios.post('/api/auth/login/local', {username, password})
        .then(() => dispatch(whoami()))
        .catch(() => dispatch(whoami()));

export const logout = () =>
    dispatch =>
        axios.post('/api/auth/logout')
        .then(() => dispatch(whoami()))
        .catch(() => dispatch(whoami()));

export const signup = (name, username, password) =>
    dispatch =>
        axios.post('api/auth/signup', {name, username, password})
        .then(() => dispatch(login(username, password)));

/* ============ REDUCER =============== */

export default function(state = null, action) {
    switch (action.type) {
        case AUTHENTICATED:
        return action.user;
    default:
        return state;
    }
}
