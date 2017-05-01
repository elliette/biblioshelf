import axios from 'axios';
import { connect } from 'react-redux';

import SignUpForm from '../components/SignUpForm';
import { signup } from '../reducers/authReducer';

const mapDispatchToProps = (dispatch) => {
	return { handleAddUser: (name, email, password) => dispatch(signup(name, email, password))}
}

export default connect(null, mapDispatchToProps)(SignUpForm)