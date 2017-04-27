import axios from 'axios';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import Book from '../components/Book';
import { deleteBook } from '../reducers/booksReducer';

const deleteBookFromDB = (bookId) => {
	return (dispatch) => {
		axios.delete(`/api/books/${bookId}`)
		.then((res) => res.data)
		.then((book) => dispatch(deleteBook(book)))
		.then(() => browserHistory.push(`/books/delete/${bookId}`));
	};
};

const mapStateToProps = (state) => {
	return {book: state.selectedBook};
};

const mapDispatchToProps = (dispatch) => {
	return {
		handleDelete: (bookId) => dispatch(deleteBookFromDB(bookId))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Book);
