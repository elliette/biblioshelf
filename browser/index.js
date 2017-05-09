import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory, IndexRedirect, Link} from 'react-router';
import { Provider, connect } from 'react-redux';
import axios from 'axios';
import store from './store';
import Login from './components/Login';
import UserAccount from './components/UserAccount';
import Home from './components/Home';
import SearchBar from './components/SearchBar';
import SingleBook from './components/SingleBook';
import AddBookForm from './components/AddBookForm';
import EditBookForm from './components/EditBookForm';
import SignUpForm from './components/SignUpForm';
import AddedBookSuccess from './messages/AddedBookSuccess';
import DeletedBookSuccess from './messages/DeletedBookSuccess';
import SignUpSuccess from './messages/SignUpSuccess';
import InvalidRequest from './messages/InvalidRequest';
import DeleteAccount from './messages/DeleteAccount';
import NoBooksFound from './messages/NoBooksFound';
import { setBooks } from './reducers/booksReducer';
import { setBook } from './reducers/singleBookReducer';
import { authenticated } from './reducers/authReducer';


const onLoadBooks = () =>
    axios.get('/api/books')
    .then(res => res.data)
    .then((books) => {store.dispatch(setBooks(books));})
    .catch(err => console.error(err));

const onLoadBook = (nextRouterState) => {
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
        store.dispatch(authenticated(userId));
        return user;
    });

const loggedInCheck = (nextState, replace) => {
    let user = store.getState().auth;
    if (!user.id) replace({ pathname: '/home' });
};

const BookShelf = function({ user, children }) {
    return (
        <div>
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <Link className="navbar-brand" to="/">Book Shelf</Link>
                    </div>
                        <ul className="nav navbar-nav">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/about">About</Link></li>
                        </ul>
                        { user.id
                            ? <div>
                            <SearchBar /> 
                            <UserAccount />
                            </div>
                            :  <div className="nav navbar-nav navbar-right">
                                <Login />
                            </div>
                        }
                </div>
            </nav>
            <div className="container">
                  { children }
            </div>
            <div className="footer"><strong>Book Shelf</strong> by Elliott Brooks</div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.auth,
    };
};

const AppContainer = connect(mapStateToProps)(BookShelf);

render(
    <Provider store={store}>
        <Router history={browserHistory} >
            <Route path="/" component={AppContainer} onEnter={setUser} >
                <IndexRedirect to="/home" />
                <Route path="/home" component={Home} onEnter={onLoadBooks} />
                <Route path="/books/:bookId/edit" component={EditBookForm} onEnter={loggedInCheck} />
                <Route path="/books/:bookId/delete" component={DeletedBookSuccess} onEnter={loggedInCheck} />
                <Route path="/books/:bookId" component={SingleBook} onEnter={onLoadBook} />
                <Route path="/add" component={AddBookForm} onEnter={loggedInCheck} />
                <Route path="/addedbooksuccess" component={AddedBookSuccess} onEnter={loggedInCheck} />
                <Route path ="/signup" component={SignUpForm} />
                <Route path = "/signupsuccess" component={SignUpSuccess} />
                <Route path = "/nobooksfound" component={NoBooksFound} onEnter={loggedInCheck} />
                <Route path = "/account" component={DeleteAccount} onEnter={loggedInCheck} />
                <Route path="*" component={InvalidRequest} />
            </Route>
        </Router>
    </Provider>,
    document.getElementById('app')
);
