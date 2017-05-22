import React from 'react';
import { Link } from 'react-router';
import { FAVORITES, TO_READ } from '../reducers/visibilityFilterReducer';

const PleaseAddBooks = ({ title }) => {
	var option;
	if (title === FAVORITES){
		option = 'favorited any books';
	} else if (title === TO_READ) {
		option = 'saved any books';
	} else {
		option = 'read any books';
	}
	return (
		<div className="jumbotron">
			<h1>You haven't {option} yet!</h1>
			<h2>But not to worry!<br /><br />You can start adding books right <Link className="link" to={'/add'}>here</Link>, or by clicking 'Add a Book' under the dropdown for your account.</h2>
		</div>
	);
};

export default PleaseAddBooks;
