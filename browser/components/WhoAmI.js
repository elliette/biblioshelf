import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import { authenticated } from '../reducers/authReducer';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import { Link } from 'react-router';

export const WhoAmI = ({ user, logout }) => (
  <div className="whoami nav navbar-nav navbar-right">
    <DropdownButton bsStyle="primary" title="Your Account"  >
	    <Link to="/add"><MenuItem key="1">Add a Book</MenuItem></Link>
	    <MenuItem key="2">Reading Stats</MenuItem>
	    <MenuItem key="3">Manage Account</MenuItem>
	    <MenuItem key="4" onClick={logout}>Logout</MenuItem>
	</DropdownButton>
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
