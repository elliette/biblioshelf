import React from 'react';
import { connect } from 'react-redux';
import Books from './Books';
import { groupByMonth } from '../utilities';

function MonthGrouping ({ books }) {
    var booksByMonth = groupByMonth(books);
    console.log('books by month', booksByMonth);
    return (
        <div>
        {
            booksByMonth.map(function(monthObj){
                return <Books key={monthObj.monthYear} title={monthObj.monthYear} books={monthObj.books} />;
            })
        }
        </div>
    );
}

function mapStateToProps(state) {
    return { books: state.books };
}

export default connect(mapStateToProps)(MonthGrouping);
