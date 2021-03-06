import React from 'react';
import { Link } from 'react-router';

const AddBookSuccess = () => {
	return (
		<div className="jumbotron">
			<h1>Congratulations!</h1>
			<h2>You've added a book.</h2>
			<Link to={`/add`}><button type="button" className="btn btn-link"><h3>[Add Another Book]</h3></button></Link>
			<Link to={`/`}><button type="button" className="btn btn-link"><h3>[Return Home]</h3></button></Link>
		</div>
	);
};

export default AddBookSuccess;
