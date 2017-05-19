'use strict';

import {combineReducers} from 'redux';
import booksReducer from './booksReducer';
import singleBookReducer from './singleBookReducer';
import authReducer from './authReducer';
import googleBooksReducer from './googleBooksReducer';
import singleGoogleBookReducer from './singleGoogleBookReducer';
import visibilityFilterReducer from './visibilityFilterReducer';
import queriedBooksReducer from './queriedBooksReducer';

const rootReducer = combineReducers({
	books: booksReducer,
	selectedBook: singleBookReducer,
	user: authReducer,
	googleBooks: googleBooksReducer,
	selectedGoogleBook: singleGoogleBookReducer,
	visibilityFilter: visibilityFilterReducer,
	queriedBooks: queriedBooksReducer
});

export default rootReducer;
