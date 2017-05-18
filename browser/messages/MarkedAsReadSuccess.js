import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

const MarkedAsReadSuccess = ({selectedBook}) => {
	return (
		<div className="jumbotron">
			<h1>Congratulations!</h1>
			<h2>We've moved <i>{selectedBook.title}</i>  to your 'Have Read Shelf'.</h2>
			<Link to={`/`}><button type="button" className="btn btn-link"><h3>[Return Home]</h3></button></Link>
		</div>
	);
};

const mapStateToProps = ({ selectedBook }) => {
	return { selectedBook };
};

export default connect(mapStateToProps)(MarkedAsReadSuccess);
