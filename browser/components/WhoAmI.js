import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import { authenticated } from '../reducers/authReducer';
import { setBooks } from '../reducers/booksReducer';
import { setBook } from '../reducers/singleBookReducer';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import { browserHistory } from 'react-router';

const WhoAmI = ({ logout }) => (
  <div className="whoami nav navbar-nav navbar-right">
    <DropdownButton bsStyle="primary" title="Your Account"  >
	    <MenuItem key="1" onClick={() => browserHistory.push('/add')}>Add a Book</MenuItem>
	    <MenuItem key="2">Reading Stats</MenuItem>
	    <MenuItem key="3">Manage Account</MenuItem>
	    <MenuItem key="4" onClick={logout}>Logout</MenuItem>
	</DropdownButton>
  </div>
);

const logout = () => {
    return (dispatch) =>  {
        axios.post('api/auth/logout')
        .then(() => dispatch(setBooks([])))
        .then(() => dispatch(setBook({})))
        .then(() => dispatch(authenticated(null)));
    };
};

export default connect(null, {logout})(WhoAmI);
