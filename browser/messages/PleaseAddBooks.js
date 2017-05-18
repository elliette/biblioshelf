import React from 'react';
import { Link } from 'react-router';

const PleaseAddBooks = ({ title }) => {
	return (
		<div className="jumbotron jumbo-with-image">
			<h1>You haven't added any {title} books yet!</h1>
			<img className="bookshelf-image" src="./bookshelf.png" alt="bookshelf image" />
			<br />
			<h2>Biblioshelf is an easy way to keep track of all the books that you have read. </h2>
			<br />
			<h2>Your shelf is currently empty.But not to worry! You can start adding books right <Link className="link" to={'/add'}>here.</Link></h2>
		</div>
	);
};

export default PleaseAddBooks;
