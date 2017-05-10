import React from 'react';
import { Link } from 'react-router';

export default function PleaseAddBooks() {
	return (
		<div className="jumbotron">
			<h1>Welcome to Biblioshelf!</h1>
			<hr />
		    <h2>Biblioshelf is an easy way to keep track of all the books that you have read. </h2>
		    <br />
		    <h2>Your shelf is currently empty.</h2>
		    <h2>But not to worry! You can start adding books right <Link className="link" to={'/add'}>here.</Link></h2>
		</div>
	);
}
