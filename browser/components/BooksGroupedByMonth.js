import React from 'react';
import { Link } from 'react-router';

export default function BooksGroupedByMonth ({ title, books }) {
	return (
		<div>
			<h1> {title} </h1>
		    <hr />
		    <ul>
				{
					books
					.sort( (book1, book2) => {return (book1.date < book2.date) ? 1 : ((book2.date < book1.date) ? -1 : 0);} )
					.map((book) => {
						return (
							<ul key={book.id} >
								<Link to={`/books/${book.id}`}>
									<img src={book.url} height="200" />
									{book.starred === 'yes'
									? <li className="title"> <i className="fa fa-heart" aria-hidden="true" />{' ' + book.title}</li>
									: <li className="title">{book.title}</li>
									}
									<li className="author">{book.author}</li>
								</Link>
							</ul>
						);
					})
				}
		    </ul>
		</div>
	);
}
