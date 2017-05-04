import React from 'react';
import { Link } from 'react-router';

export default function InvalidRequestMessage () {
	return (
		<div className="jumbotron">
			<h1>Uh oh!</h1>
			<h2>That's an invalid request.</h2>
			<Link to={`/`}><button type="button" className="btn btn-link"><h3>[Return Home]</h3></button></Link>
		</div>
	);
}
