import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { authenticated } from '../reducers/authReducer';

const LoginForm = ( { login }) => {

    const handleSubmit = (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        login(email, password);
    };

    return (
        <form className="navbar-form" role="login" onSubmit={handleSubmit}>
            <div className="form-group">
                <input type="text" className="form-control" name="email" placeholder="Email" />
            </div>
            <div className="form-group">
                <input type="password" className="form-control" name="password" placeholder="Password" />
            </div>
            <button type="submit" className="btn btn-primary">Log In</button>
        </form>
    );
};

const login = (email, password) => {
    return (dispatch) => {
        axios.post('/api/auth/login', {email, password})
        .then((res) => res.data)
        .then((user) => {
            dispatch(authenticated(user.id));
        })
        .then(() => window.location.assign('/'))
        .catch(err => {
            if (!err.response.statusText) console.error(err);
            else alert(err.response.statusText);
        });
    };
};

export default connect(null, { login })(LoginForm);
