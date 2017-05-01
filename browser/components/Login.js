import React, { Component } from 'react';
import {login} from '../reducers/authReducer'
import {connect} from 'react-redux'

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        console.log("EMAIL:", email);
        console.log("PASSWORD", password);
        this.props.handleLogin(email, password)
        //login(email, password)
    }

    render(){
        return (
        <form className="navbar-form navbar-right" role="login" onSubmit={this.handleSubmit}>
    <div className="form-group">
        <input type="text" className="form-control" name="email" placeholder="Email" />
    </div>
    <div className="form-group">
        <input type="text" className="form-control" name="password" placeholder="Password" />
    </div>
    <button type="submit" className="btn btn-default">Log In</button>
</form>
)

    }

}


