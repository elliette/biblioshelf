import axios from 'axios';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import Login from '../components/Login';
import { authenticated } from '../reducers/authReducer';

const login = (email, password) => {
	return (dispatch) => {
		axios.post('/api/auth/login', {email, password})
		.then((res) => res.data)
		.then((user) => dispatch(authenticated(user.id)))
		.then(() => browserHistory.push('/home'));
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		handleLogin: (email, password) => dispatch(login(email, password))
	};
};

export default connect(null, mapDispatchToProps)(Login);
