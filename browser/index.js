import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRedirect} from 'react-router';
import { Provider } from 'react-redux';
import axios from 'axios';

import HomeContainer from './containers/HomeContainer';
import BookContainer from './containers/BookContainer';
import AppContainer from './containers/AppContainer';
import AddBookContainer from './containers/AddBookContainer';
import EditBookContainer from './containers/EditBookContainer';
import AddBookMessage from './components/AddBookMessage';
import DeletedBookMessage from './components/DeletedBookMessage';
import SignUpMessage from './components/SignUpMessage';
import UserSignUpContainer from './containers/UserSignUpContainer';
import store from './store';
import { setBooks } from './reducers/booksReducer';
import { setBook } from './reducers/singleBookReducer';
import { authenticated } from './reducers/authReducer';

console.log("STORE", store);

// const onLoadBooks = function() {
//     axios.get('/api/books')
//         .then(res => res.data)
//         .then((books) => {store.dispatch(setBooks(books));})
//         .catch(err => console.error(err));
// };

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
      });

// export const whoami = () =>
//     dispatch =>
//         axios.get('/api/auth/whoami')
//         .then(user => {
//             let userId = user.data.id;
//             console.log('Setting the user on state:', userId);
//             dispatch(authenticated(userId));
//       });
      //.catch(failed => dispatch(authenticated(null)));


ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory} >
            <Route path="/" component={AppContainer} onEnter={setUser} >
                <Route path="/home" component={HomeContainer} />
                <Route path="/books/:bookId" component={BookContainer} onEnter={onLoadBook} />
                <Route path="/books/edit/:bookId" component={EditBookContainer} />
                <Route path="/add" component={AddBookContainer} />
                <Route path="/message" component={AddBookMessage} />
                <Route path="/books/delete/:bookId" component={DeletedBookMessage} />
                <Route path ="/signup" component={UserSignUpContainer} />
                <Route path = "/signupsuccess" component={SignUpMessage} />
                <IndexRedirect to="/home" />
            </Route>
        </Router>
    </Provider>,
    document.getElementById('app')
);
