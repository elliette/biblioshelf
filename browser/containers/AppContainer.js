import React, {Component} from 'react';
import { Link } from 'react-router';
import Login from '../components/Login';
import WhoAmI from '../components/WhoAmI';

// need to get the user from the session
// need to also make a sign up option!
const user = null;

export default class AppContainer extends Component {

    constructor(props){
        super(props);
    }

    render(){
        return (
            <div>
                <nav className="navbar navbar-default">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <Link className="navbar-brand" to="/">Book Shelf</Link>
                        </div>
                        <ul className="nav navbar-nav">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/add">Add a Book</Link></li>
                            <li><Link to="/stats">Reading Stats</Link></li>
                            <li><Link to="/about">About</Link></li>
                        </ul>
                        <form className="navbar-form navbar-left">
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="Search" />
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                        {user ? <WhoAmI /> : <div><Login /><Link to="/signup"><button type="submit" className="btn btn-secondary">Sign Up</button></Link></div>}
                    </div>
                </nav>
                <div className="container">
                      {this.props.children}
                </div>
                <div className="footer"><strong>Book Shelf</strong> by Elliott Brooks</div>
            </div>
        )
    }
}
