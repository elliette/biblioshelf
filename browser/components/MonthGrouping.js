import React from 'react';
import { connect } from 'react-redux';
import Books from './Books';
import { groupByMonth } from '../utilities';

const MonthGrouping = ({ books }) => {
    let booksByMonth = groupByMonth(books);
    return (
        <div>
            {booksByMonth.map(monthObj => <Books key={monthObj.monthYear} title={monthObj.monthYear} books={monthObj.books} /> )}
        </div>
    );
};

const mapStateToProps = ({ books }) => {
    return { books };
};

export default connect(mapStateToProps)(MonthGrouping);
