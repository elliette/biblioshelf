import React from 'react';
import { browserHistory } from 'react-router';
import axios from 'axios';

const signup = (event) => {
    event.preventDefault();
    var name = event.target.name.value;
    var email = event.target.email.value;
    var password = event.target.password.value;
    axios.post('/api/auth/signup', {name, email, password})
    .then(() => browserHistory.push('/signupsuccess'));
};

const SignUpForm = () => {
    return (
        <div>
            <h3>Sign Up</h3>
            <hr />
            <form onSubmit={(event) => signup(event)}>
                <div className="form-group">
                    <label htmlFor="title" className="col-sm-2 control-label">Name</label>
                    <div className="col-sm-10">
                        <input name="name" type="text" className="form-control" />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="author" className="col-sm-2 control-label">Email</label>
                    <div className="col-sm-10">
                        <input name="email" type="text" className="form-control" />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="url" className="col-sm-2 control-label">Password</label>
                    <div className="col-sm-10">
                        <input name="password" type="password" className="form-control" />
                    </div>
                </div>
                <div className="col-sm-offset-2 col-sm-10">
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default SignUpForm;
