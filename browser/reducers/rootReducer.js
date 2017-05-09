import {combineReducers} from 'redux';
import booksReducer from './booksReducer';
import singleBookReducer from './singleBookReducer';
import authReducer from './authReducer';
import googleBooksReducer from './googleBooksReducer';

const rootReducer = combineReducers({
	books: booksReducer,
	selectedBook: singleBookReducer,
	auth: authReducer,
	googleBooks: googleBooksReducer
});

export default rootReducer;
