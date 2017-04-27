import {combineReducers} from 'redux';
import booksReducer from './booksReducer';
import singleBookReducer from './singleBookReducer';

const rootReducer = combineReducers({
	books: booksReducer,
	selectedBook: singleBookReducer
});

export default rootReducer;
