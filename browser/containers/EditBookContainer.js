import axios from 'axios';
import { connect } from 'react-redux';
import { browserHistory
 } from 'react-router';

import EditBookForm from '../components/EditBookForm';
import { editBook } from '../reducers/booksReducer';

const editBookInDB = (book) => {
	return (dispatch) => {
		axios.put(`/api/books`, book)
		.then((res) => res.data)
		.then((updatedBook) => {
			dispatch(editBook(updatedBook));
		})
		.then(() => browserHistory
.push(`/home`));
	};
};

const mapStateToProps = (state) => {
	return {book: state.selectedBook};
};

const mapDispatchToProps = (dispatch) => {
	return { handleEditBook: (book) => dispatch(editBookInDB(book)) };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditBookForm);
