import React from 'react';
import { browserHistory } from 'react-router';
import axios from 'axios';
import validator from 'email-validator';

const signup = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirm.value;
    const signupErrorsArr = [];
    axios.get(`api/auth/user/${email}`)
    .then(res => res.data)
    .then( (user) => {
        if (user) signupErrorsArr.push('* There is already a user with that email address.');
        if (!name) signupErrorsArr.push('* Name cannot be empty.');
        if (!validator.validate(email)) signupErrorsArr.push('* Invalid email address.');
        if (password.length < 8) signupErrorsArr.push('* Password must be at least 8-characters long.');
        if (password !== confirmPassword) signupErrorsArr.push('* Your passwords did not match.');
        if (signupErrorsArr.length){
            let invalidSignUpMessage = `The following problems were found with your signup attempt:\n\n${signupErrorsArr.join('\n')}\n\nPlease try again.`;
            alert(invalidSignUpMessage);
            return;
        }
        axios.post('/api/auth/signup', {name, email, password})
        .then(() => browserHistory.push('/signupsuccess'));
    });
};

const SignUpForm = () => {
    return (
        <div className="jumbotron signup-form">
            <h1>Sign Up:</h1>
            <form onSubmit={(event) => signup(event)}>
                <div className="form-group">
                    <input name="name" type="text" placeholder="Name" className="form-control" />
                </div>
                <div className="form-group">
                    <input name="email" type="text" placeholder="Email" className="form-control" />
                </div>
                <div className="form-group">
                    <input name="password" type="password" placeholder="Password" className="form-control" />
                </div>
                <div className="form-group">
                    <input name="confirm" type="password" placeholder="Confirm password" className="form-control" />
                </div>
                <div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default SignUpForm;
