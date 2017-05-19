import React from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import Markdown from 'react-markdown';
import dateFormat from 'dateformat';
import axios from 'axios';
import InvalidRequest from '../messages/InvalidRequest';
import { deleteBook, editBook } from '../reducers/booksReducer';
import { removeBook } from '../reducers/singleBookReducer';

const SingleBook = ({selectedBook, deleteBookFromDB, markAsRead }) => {
    if (Object.keys(selectedBook).length === 0){
        return ( <InvalidRequest /> );
    } else {
        return (
            <div className="jumbotron">
                <img className="book-image" src={selectedBook.url} />
                <div className="book-box">
                    {selectedBook.starred === 'yes'
                        ? <h2>{selectedBook.title} <i className="fa fa-heart" aria-hidden="true" /></h2>
                        : <h2>{selectedBook.title}</h2>
                    }
                    <h3><i>by {selectedBook.author}</i></h3>
                    <p><b>{selectedBook.toRead === 'yes' ? 'Added on:' : 'Read on:'}</b> {dateFormat(selectedBook.date, 'dddd, mmmm dS, yyyy')}</p>
                    {selectedBook.notes
                        ?
                        <div className="bookNotes">
                            <Markdown source={selectedBook.notes} />
                        </div>
                        : null
                    }
                    <div className="bottom-buttons">
                    {selectedBook.toRead === 'yes'
                        ?
                        <button type="button" className="btn btn-link" onClick={() => markAsRead(selectedBook)}>[Mark As Read]</button>
                        :
                        <Link to={`/books/${selectedBook.id}/edit`}><button type="button" className="btn btn-link">[Edit Book]</button></Link>
                    }
                        <button type="button" className="btn btn-link" onClick={() => deleteBookFromDB(selectedBook.id)}>[Delete Book]</button>
                    </div>
                    <Link to={`/`}><button type="button" className="btn btn-link"><h4>Return Home</h4></button></Link>
                </div>
            </div>
        );
    }
};

const deleteBookFromDB = (bookId) => {
	return (dispatch) => {
		axios.delete(`/api/books/${bookId}`)
		.then((res) => res.data)
		.then((book) => dispatch(deleteBook(book)))
		.then(() => browserHistory.push(`/books/${bookId}/delete`));
	};
};

const markAsRead = (book) => {
    book.toRead = 'no';
    book.date = new Date();
    return (dispatch) => {
        axios.put(`/api/books/${book.id}`, book)
        .then((res) => res.data)
        .then((updatedBook) => dispatch(editBook(updatedBook)))
        .then(() => browserHistory.push(`/readbooksuccess`))
        .catch(err => console.error(err));
    };
};

const mapStateToProps = ({ selectedBook }) => {
	return { selectedBook };
};

export default connect(mapStateToProps, { deleteBookFromDB, markAsRead })(SingleBook);
