import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRedirect} from 'react-router';
import HomeContainer from './containers/HomeContainer';
import BookContainer from './containers/BookContainer';
import Book from './components/Book';
import AppContainer from './containers/AppContainer';
import AddBookContainer from './containers/AddBookContainer';
import EditBook from './components/EditBook';
import AddBookMessage from './components/AddBookMessage';
import DeletedBookMessage from './components/DeletedBookMessage';
import { Provider } from 'react-redux';
import store from './store';
import { setBooks } from './reducers/book-reducer';
import { setBook } from './reducers/single-book-reducer';
import axios from 'axios';


const onLoadBooks = function() {
     axios.get('/api/books')
        .then(res => res.data)
        .then((books) => {
            console.log("Loading Books on onLoadBooks and dispatching my action", books)
            store.dispatch(setBooks(books))
        })
        .catch(err => console.error(err))   
}

const onLoadBook = function(nextRouterState) {
     var id = nextRouterState.params.bookId
     axios.get(`/api/books/${id}`)
        .then(res => res.data)
        .then((book) => {
            console.log("Loading single Book on onLoadBook and dispatching my action", book)
            store.dispatch(setBook(book))
        })
        .catch(err => console.error(err))   
}

ReactDOM.render(
    <Provider store={store}>
    	<Router history={hashHistory} >
    		<Route path="/" component={AppContainer} onEnter={onLoadBooks} > 
    			<Route path="/home" component={HomeContainer} />
    			<Route path="/books/:bookId" component={BookContainer} onEnter={onLoadBook} />
    			<Route path="/books/edit/:bookId" component={EditBook} />
        		<Route path='/add' component={AddBookContainer} /> 
        		<Route path='/message' component={AddBookMessage} /> 
                <Route path='/books/delete/:bookId' component={DeletedBookMessage} /> 
        		<IndexRedirect to='/home' />
        	</Route> 
        </Router>
    </Provider>,   
    document.getElementById('app')
);






