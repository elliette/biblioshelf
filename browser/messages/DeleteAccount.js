import React from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import axios from 'axios';
import { logout } from '../reducers/authReducer';

const DeleteAccount = ({ deleteUser }) => {
    return (
        <div className="jumbotron">
			<h1>Manage Account</h1>
			<h2>You can delete your account here.</h2>
			<button type="button" className="btn btn-link" onClick={deleteUser}><h3>[Delete Account]</h3></button>
		</div>
    );
};

const deleteUser = () => {
	return (dispatch) => {
		axios.delete(`api/auth/user`)
		.then(() => dispatch(logout()))
		.then(() => browserHistory.push('/home'))
		.catch(console.error);
	};
};

export default connect(null, { deleteUser })(DeleteAccount);
