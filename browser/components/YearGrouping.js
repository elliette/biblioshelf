import React from 'react';
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

export default YearGrouping;
