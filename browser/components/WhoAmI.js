import React from 'react'
import {logout} from '../reducers/authReducer'
import {connect} from 'react-redux'

export const WhoAmI = ({ user, logout }) => (
  <div className="whoami">
    <span className="whoami-user-name">{user && user.name}</span>
    <button className="logout" onClick={logout}>Logout</button>
  </div>
)


export default connect(({ auth }) => ({ user: auth }), {logout})(WhoAmI)
