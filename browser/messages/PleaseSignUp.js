import React from 'react';
import { Link } from 'react-router';

export default function PleaseSignUp() {
	return (
		<div className="jumbotron">
			<h1>Welcome to Bookshelf!</h1>
			<hr />
		    <h2>Book Shelf is an easy way to keep track of all the books that you have read. </h2>
		    <br />
		    <h2>Please <Link className="link" to={'/signup'}>sign up</Link> to begin using Bookshelf today!</h2>
		</div>
	);
}
