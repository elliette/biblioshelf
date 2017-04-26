import axios from 'axios';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

import Book from '../components/Book';
import { deleteBook } from '../reducers/book-reducer';

const deleteBookFromDB = (bookId) => {
	return (dispatch) => {
		axios.delete(`/delete/${bookId}`)
		.then((res) => res.data)
		.then((book) => dispatch(deleteBook(book)))
		.then(() => hashHistory.push(`/books/delete/${bookId}`));
	};
};

const mapStateToProps = (state) => {
	return {book: state.selectedBook};
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleDelete: (bookId) => {
      dispatch(deleteBookFromDB(bookId));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Book);
