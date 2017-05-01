import React from 'react'
import {login} from '../reducers/authReducer'
import {connect} from 'react-redux'

export const Login = ({ login }) => (
  <form className="navbar-form navbar-right" role="login" onSubmit={evt => {
    evt.preventDefault()
    login(evt.target.email.value, evt.target.password.value)
  } }>
    <div className="form-group">
        <input type="text" className="form-control" name="email" placeholder="Email" />
    </div>
    <div className="form-group">
        <input type="text" className="form-control" name="password" placeholder="Password" />
    </div>
    <button type="submit" className="btn btn-default">Log In</button>
</form>


)


export default connect(state => ({}), {login} )(Login)
