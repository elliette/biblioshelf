import React from 'react';
import { Link } from 'react-router';

const NoBooksFound = () => {
	return (
		<div className="jumbotron">
			<h1>Sorry!</h1>
			<h2>No books matched your query.</h2>
			<Link to={`/`}><button type="button" className="btn btn-link"><h3>[Return Home]</h3></button></Link>
		</div>
	);
};

export default NoBooksFound;
