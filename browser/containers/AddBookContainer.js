import axios from 'axios';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

import AddBookForm from '../components/AddBookForm';
import { addBook } from '../reducers/book-reducer';

const addBookToDB = (book) => {
	return (dispatch) => {
		axios.post(`/api/books`, book)
		.then((res) => res.data)
		.then((newBook) => dispatch(addBook(newBook)))
		.then(() => hashHistory.push('/message'));
	};
};

const mapDispatchToProps = (dispatch) => {
  return { handleAddBook: (book) => dispatch(addBookToDB(book)) };
};

export default connect(null, mapDispatchToProps)(AddBookForm);
