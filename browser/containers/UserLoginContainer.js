import axios from 'axios';
import { connect } from 'react-redux';

import Login from '../components/Login';
import { login } from '../reducers/authReducer';

const mapDispatchToProps = (dispatch) => {
    return { handleLogin: (email, password) => dispatch(login(email, password))}
}

export default connect(null, mapDispatchToProps)(Login)