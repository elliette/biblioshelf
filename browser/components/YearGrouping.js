import React from 'react';
import { connect } from 'react-redux';
import Books from './Books';
import { groupByYear } from '../utilities';

const YearGrouping = ({ books }) => {
    let booksByYear = groupByYear(books);
    return (
        <div>
            {booksByYear.map(yearObj => <Books key={yearObj.year} title={yearObj.year} books={yearObj.books} /> )}
        </div>
    );
};

const mapStateToProps = ({ books }) => {
    return { books };
};

export default connect(mapStateToProps)(YearGrouping);
