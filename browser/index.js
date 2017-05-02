import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory, IndexRedirect, Link} from 'react-router';
import { Provider, connect } from 'react-redux';
import LoginContainer from './containers/LoginContainer';
import WhoAmI from './components/WhoAmI';
import HomeContainer from './containers/HomeContainer';
import BookContainer from './containers/BookContainer';
import AddBookContainer from './containers/AddBookContainer';
import EditBookContainer from './containers/EditBookContainer';
import AddBookMessage from './components/AddBookMessage';
import DeletedBookMessage from './components/DeletedBookMessage';
import SignUpMessage from './components/SignUpMessage';
import UserSignUpContainer from './containers/UserSignUpContainer';
import store from './store';
import axios from 'axios';
// comment back in:
//import { setBooks } from './reducers/booksReducer';
//import { setBook } from './reducers/singleBookReducer';
import { authenticated } from './reducers/authReducer';


const onLoadBooks = function() {
    axios.get('/api/books')
        .then(res => res.data)
        .then((books) => {store.dispatch(setBooks(books));})
        .catch(err => console.error(err));
};

const onLoadBook = function(nextRouterState) {
    var id = nextRouterState.params.bookId;
    axios.get(`/api/books/${id}`)
        .then(res => res.data)
        .then((book) => {store.dispatch(setBook(book));})
        .catch(err => console.error(err));
};

const setUser = () =>
    axios.get('/api/auth/whoami')
    .then(user => {
        let userId = user.data.id;
        console.log('Setting the user on state:', userId);
        store.dispatch(authenticated(userId));
    })

// export const whoami = () =>
//     dispatch =>
//         axios.get('/api/auth/whoami')
//         .then(user => {
//             let userId = user.data.id;
//             console.log('Setting the user on state:', userId);
//             dispatch(authenticated(userId));
//       });
      //.catch(failed => dispatch(authenticated(null)));


const currUser = null;

const BookShelf = function(props) {
    console.log("props are ", props);
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
                        <button type="submit" className="btn btn-default">Submit</button>
                    </form>
                    { props.auth ? <WhoAmI /> : <ul className="nav navbar-nav navbar-right"><li><LoginContainer /></li><li><Link to="/signup"><button className="btn btn-info navbar-right" type="submit">Sign Up</button></Link></li></ul>}
                </div>
            </nav>
            <div className="container">
                  { props.children }
            </div>
            <div className="footer"><strong>Book Shelf</strong> by Elliott Brooks</div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
    };
};

const AppContainer = connect(mapStateToProps)(BookShelf);

render(
    <Provider store={store}>
        <Router history={browserHistory} >
            <Route path="/" component={AppContainer} onEnter={setUser} >
                <IndexRedirect to="/home" />
                <Route path="/home" component={HomeContainer} onEnter={onLoadBooks} />
                <Route path="/books/:bookId" component={BookContainer} onEnter={onLoadBook} />
                <Route path="/books/edit/:bookId" component={EditBookContainer} />
                <Route path="/add" component={AddBookContainer} />
                <Route path="/message" component={AddBookMessage} />
                <Route path="/books/delete/:bookId" component={DeletedBookMessage} />
                <Route path ="/signup" component={UserSignUpContainer} />
                <Route path = "/signupsuccess" component={SignUpMessage} />

            </Route>
        </Router>
    </Provider>,
    document.getElementById('app')
);
