import {combineReducers} from 'redux';
import booksReducer from './booksReducer';
import singleBookReducer from './singleBookReducer';
import authReducer from './authReducer';
import googleBooksReducer from './googleBooksReducer';
import singleGoogleBookReducer from './singleGoogleBookReducer';

const rootReducer = combineReducers({
	books: booksReducer,
	selectedBook: singleBookReducer,
	auth: authReducer,
	googleBooks: googleBooksReducer,
	selectedGoogleBook: singleGoogleBookReducer
});

export default rootReducer;
