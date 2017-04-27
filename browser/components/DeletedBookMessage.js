import React from 'react';
import { Link } from 'react-router';

export default function DeletedBookMessage() {
    return (
        <div className="jumbotron">
			<h1>Success!</h1>
			<h2>You've deleted a book.</h2>
			<Link to={`/`}><button type="button" className="btn btn-link"><h3>[Return Home]</h3></button></Link>
		</div>
    );
}
