import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import { authenticated } from '../reducers/authReducer';
//import { browserHistory } from 'react-router';

export const WhoAmI = ({ user, logout }) => (
  <div className="whoami">
    <button className="btn btn-primary" onClick={logout}>Logout</button>
  </div>
);

export const logout = () => {
    return (dispatch) =>  {
        axios.post('api/auth/logout')
        .then(() => dispatch(authenticated(null)))
        .then(() => window.location.reload());
    };
};

const mapStateToProps = (state) => {
	return {user: state.auth};
};

export default connect(mapStateToProps, {logout})(WhoAmI);
