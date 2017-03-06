import {combineReducers} from 'redux';
import booksReducer from './book-reducer'; 

export default combineReducers({
	books: booksReducer, 
});