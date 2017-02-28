import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRedirect} from 'react-router';
import Home from './Home';
import Book from './Book';
import AppContainer from './AppContainer';
import AddBook from './AddBook';
import EditBook from './EditBook';
import AddBookMessage from './AddBookMessage';

ReactDOM.render(
	<Router history={hashHistory} >
		<Route path="/" component={AppContainer}> 
			<Route path="/home" component={Home}/>
			<Route path="/books/:bookId" component={Book} />
			<Route path="/books/edit/:bookId" component={EditBook} />
    		<Route path='/add' component={AddBook} /> 
    		<Route path='/message' component={AddBookMessage} /> 
    		<IndexRedirect to='/home' />
    	</Route> 
    </Router>,   
    document.getElementById('app')
);






