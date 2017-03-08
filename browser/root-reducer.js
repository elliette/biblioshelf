import {combineReducers} from 'redux';
import booksReducer from './book-reducer'; 
import singleBookReducer from './single-book-reducer'; 

export default combineReducers({
	books: booksReducer, 
	selectedBook: singleBookReducer
});