import {combineReducers} from 'redux';
import booksReducer from './book-reducer';
import singleBookReducer from './single-book-reducer';

const rootReducer = combineReducers({
	books: booksReducer,
	selectedBook: singleBookReducer
});

export default rootReducer;
