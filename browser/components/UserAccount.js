import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import { logout } from '../reducers/authReducer';

const UserAccount = ({ logout }) => (
  <div className="whoami nav navbar-nav navbar-right">
    <DropdownButton bsStyle="primary" title="Your Account" id="dropdownButton" >
	    <MenuItem key="1" onClick={() => browserHistory.push('/add')}>Add a Book</MenuItem>
	    <MenuItem key="2" onClick={() => browserHistory.push('/account')}>Manage Account</MenuItem>
	    <MenuItem key="3" onClick={logout}>Logout</MenuItem>
	</DropdownButton>
  </div>
);

export default connect(null, { logout })(UserAccount);
