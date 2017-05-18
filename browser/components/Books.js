import React from 'react';
import { Link } from 'react-router';
import { sortBooks } from '../utilities';


const Books = ({ title, books }) => {
	return (
		<div>
			<h1> {title} </h1>
		    <hr />
		    <ul>
				{sortBooks(books)
				.map((book) => {
					return (
						<ul key={book.id} >
							<Link to={`/books/${book.id}`}>
								<img className="book-list-image" src={book.url} />
								{book.starred === 'yes'
								? <li className="title"> <i className="fa fa-heart" aria-hidden="true" />{' ' + book.title}</li>
								: <li className="title">{book.title}</li>
								}
								<li className="author">{book.author}</li>
							</Link>
						</ul>
					);
				})}
		    </ul>
		</div>
	);
};

export default Books;
