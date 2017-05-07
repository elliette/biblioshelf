import React from 'react';
import { Link } from 'react-router';
import dateFormat from 'dateformat';
import Markdown from 'react-markdown';
import InvalidRequest from '../messages/InvalidRequest';

export default function Book ( {book, handleDelete}) {
    if (Object.keys(book).length === 0){
        return ( <InvalidRequest /> );
    } else {
        return (
            <div>
                <img className="book-image" src={book.url} />
                <div className="book-box">
                    {book.starred === 'yes'
                        ? <h1>{book.title} <i className="fa fa-heart" aria-hidden="true" /></h1>
                        : <h1>{book.title}</h1>
                    }
                    <h4><i>by {book.author}</i></h4>
                    <p><b>Read on:</b> {dateFormat(book.date, 'dddd, mmmm dS, yyyy')}</p>
                    <div className="bookNotes">
                        <Markdown source={book.notes ? book.notes : 'There are no notes for this book yet.'} />
                    </div>
                    <div className="bottom-buttons">
                        <Link to={`/books/edit/${book.id}`}><button type="button" className="btn btn-link">[Edit Book]</button></Link>
                        <button type="button" className="btn btn-link" onClick={() => handleDelete(book.id)}>[Delete Book]</button>
                    </div>
                </div>
            </div>
        );
}
}
