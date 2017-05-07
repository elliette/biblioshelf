import React from 'react';
import { Link } from 'react-router';

export default function WelcomeMessage() {
	return (
		<div className="jumbotron">
			<h1>Welcome to Book Shelf!</h1>
			<hr />
		    <h2>Book Shelf is an easy way to keep track of all the books that you have read. </h2>
		    <br />
		    <h2>Your book shelf is currently empty.</h2>
		    <h2> But not to worry! You can start adding books right <Link className="link" to={'/add'}>here.</Link></h2>
		</div>
	);
}
