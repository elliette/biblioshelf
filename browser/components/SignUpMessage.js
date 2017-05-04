import React from 'react';
import { Link } from 'react-router';

export default function SignUpMessage () {
	return (
		<div className="jumbotron">
			<h1>Welcome to Bookshelf!</h1>
			<h2>Please <Link to={`/signup`}>sign up</Link> to begin using Bookshelf today.</h2>
		</div>
	);
}

