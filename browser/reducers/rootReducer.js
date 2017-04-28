import {combineReducers} from 'redux';
import booksReducer from './booksReducer';
import singleBookReducer from './singleBookReducer';
import authReducer from './authReducer';

const rootReducer = combineReducers({
	books: booksReducer,
	selectedBook: singleBookReducer,
	auth: authReducer
});

export default rootReducer;
