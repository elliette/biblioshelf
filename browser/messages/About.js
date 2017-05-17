import React from 'react';

const About = () => {
	return (
		<div className="jumbotron">
			<h1>About Biblioshelf</h1>
			<p> Biblioshelf was built for readers. It lets users keep track of all the books they've read. They can add a new book with just the click of a button, take notes on each book with Markdown, and view all their books grouped by month or year read.</p>
			<br />
			<h2>Technologies:</h2>
			<p>Biblioshelf is a single-page application built atop a RESTful API. Its backend was created with Node and Express, with a  PostgreSQL database and Sequelize as its ORM. React, React Router, and React-Redux power Biblioshelf's frontend. Biblioshelf is integrated with the Google Books API to fetch book metadata for its users. Finally, Biblioshelf's uses bcrypt for its user authentication. </p>
			<br />
			<p>Biblioshelf's source code is available on <a className="link" href="https://github.com/elliette/bookshelf-react">Github</a>.</p>
		</div>
	);
};

export default About;
