import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRedirect} from 'react-router';
import HomeContainer from './HomeContainer';
import Book from './Book';
import AppContainer from './AppContainer';
import AddBook from './AddBook';
import EditBook from './EditBook';
import AddBookMessage from './AddBookMessage';
import { Provider } from 'react-redux';
import store from './store'; 
import { setBooks } from './book-reducer'; 
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

ReactDOM.render(
    <Provider store={store}>
    	<Router history={hashHistory} >
    		<Route path="/" component={AppContainer} onEnter={onLoadBooks} > 
    			<Route path="/home" component={HomeContainer} />
    			<Route path="/books/:bookId" component={Book} />
    			<Route path="/books/edit/:bookId" component={EditBook} />
        		<Route path='/add' component={AddBook} /> 
        		<Route path='/message' component={AddBookMessage} /> 
        		<IndexRedirect to='/home' />
        	</Route> 
        </Router>
    </Provider>,   
    document.getElementById('app')
);






