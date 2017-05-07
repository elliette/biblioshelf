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
import AddedBookSuccess from './messages/AddedBookSuccess';
import DeletedBookSuccess from './messages/DeletedBookSuccess';
import SignUpSuccess from './messages/SignUpSuccess';
import UserSignUpContainer from './containers/UserSignUpContainer';
import InvalidRequest from './messages/InvalidRequest';
import store from './store';
import axios from 'axios';
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
    });

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
                                <form className="navbar-form navbar-left">
                                    <div className="form-group">
                                        <input type="text" className="form-control" placeholder="Search" />
                                    </div>
                                    <button type="submit" className="btn btn-default">Submit</button>
                                </form>
                                <WhoAmI />
                            </div>
                            :  <div className="nav navbar-nav navbar-right">
                                <LoginContainer />
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
                <Route path="/home" component={HomeContainer} onEnter={onLoadBooks} />
                <Route path="/books/:bookId" component={BookContainer} onEnter={onLoadBook} />
                <Route path="/books/edit/:bookId" component={EditBookContainer} />
                <Route path="/add" component={AddBookContainer} />
                <Route path="/message" component={AddedBookSuccess} />
                <Route path="/books/delete/:bookId" component={DeletedBookSuccess} />
                <Route path ="/signup" component={UserSignUpContainer} />
                <Route path = "/signupsuccess" component={SignUpSuccess} />
                <Route path="*" component={InvalidRequest} />
            </Route>
        </Router>
    </Provider>,
    document.getElementById('app')
);
