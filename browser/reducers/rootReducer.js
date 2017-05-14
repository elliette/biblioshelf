import {combineReducers} from 'redux';
import booksReducer from './booksReducer';
import singleBookReducer from './singleBookReducer';
import authReducer from './authReducer';
import googleBooksReducer from './googleBooksReducer';
import singleGoogleBookReducer from './singleGoogleBookReducer';
import visibilityFilterReducer from './visibilityFilterReducer';

const rootReducer = combineReducers({
	books: booksReducer,
	selectedBook: singleBookReducer,
	auth: authReducer,
	googleBooks: googleBooksReducer,
	selectedGoogleBook: singleGoogleBookReducer,
	visibilityFilter: visibilityFilterReducer
});

export default rootReducer;
