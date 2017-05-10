import React from 'react';
import { Link } from 'react-router';

export default function PleaseSignUp() {
	return (
		<div className="jumbotron">
			<h1>Welcome to Biblioshelf!</h1>
		    <h2>Biblioshelf is an easy way to keep track of all the books that you have read. </h2>
		    <h2>Please <Link className="link" to={'/signup'}>sign up</Link> to begin using Biblioshelf today!</h2>
		</div>
	);
}
