import React from 'react';
import { Link } from 'react-router';

const NoBooksFound = () => {
	return (
		<div className="jumbotron">
			<h1>Sorry!</h1>
			<h2>No books matched your query.</h2>
		</div>
	);
};

export default NoBooksFound;
