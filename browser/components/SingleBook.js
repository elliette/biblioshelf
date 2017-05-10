import React from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import Markdown from 'react-markdown';
import dateFormat from 'dateformat';
import axios from 'axios';
import InvalidRequest from '../messages/InvalidRequest';
import { deleteBook } from '../reducers/booksReducer';

function SingleBook ( {book, handleDelete}) {
    if (Object.keys(book).length === 0){
        return ( <InvalidRequest /> );
    } else {
        return (
            <div className="jumbotron">
                <img className="book-image" src={book.url} />
                <div className="book-box">
                    {book.starred === 'yes'
                        ? <h2>{book.title} <i className="fa fa-heart" aria-hidden="true" /></h2>
                        : <h2>{book.title}</h2>
                    }
                    <h3><i>by {book.author}</i></h3>
                    <p><b>Read on:</b> {dateFormat(book.date, 'dddd, mmmm dS, yyyy')}</p>
                    {book.notes
                        ?
                        <div className="bookNotes">
                            <Markdown source={book.notes} />
                        </div>
                        : null
                    }
                    <div className="bottom-buttons">
                        <Link to={`/books/${book.id}/edit`}><button type="button" className="btn btn-link">[Edit Book]</button></Link>
                        <button type="button" className="btn btn-link" onClick={() => handleDelete(book.id)}>[Delete Book]</button>
                    </div>
                </div>
            </div>
        );
    }
}

const deleteBookFromDB = (bookId) => {
	return (dispatch) => {
		axios.delete(`/api/books/${bookId}`)
		.then((res) => res.data)
		.then((book) => dispatch(deleteBook(book)))
		.then(() => browserHistory.push(`/books/${bookId}/delete`));
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

export default connect(mapStateToProps, mapDispatchToProps)(SingleBook);
