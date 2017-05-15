import React from 'react';
import { Link } from 'react-router';

export default function PleaseSignUp() {
	return (
		<div className="jumbotron jumbo-with-image">
			<h1>Welcome to Biblioshelf!</h1>
			<img className="bookshelf-image" src="./bookshelf.png" alt="bookshelf image" />
			<br />
		    <h2>Biblioshelf is an easy way to keep track of all the books that you have read. </h2>
		    <br />
		    <h2>Please <Link className="link" to={'/signup'}>sign up</Link> to begin using Biblioshelf today!</h2>
		</div>
	);
}
