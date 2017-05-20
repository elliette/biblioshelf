import React from 'react';
import { Link } from 'react-router';
import { FAVORITES, TO_READ } from '../reducers/visibilityFilterReducer';

const PleaseAddBooks = ({ title }) => {
	var option;
	if (title === FAVORITES){
		option = 'favorited any books';
	} else if (title === TO_READ) {
		option = 'added any books to your to-read list';
	} else {
		option = 'read any books';
	}
	return (
		<div className="jumbotron">
			<h1>You haven't {option} yet!</h1>
			<br />
			<h2>But not to worry! You can start adding books right <Link className="link" to={'/add'}>here.</Link></h2>
		</div>
	);
};

export default PleaseAddBooks;
