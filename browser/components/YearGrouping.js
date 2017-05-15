import React from 'react';
import { connect } from 'react-redux';
import Books from './Books';
import { groupByYear } from '../utilities';

function YearGrouping ({ books }) {
    var booksByYear = groupByYear(books);
    return (
        <div>
        {
            booksByYear.map(function(yearObj){
                return <Books key={yearObj.year} title={yearObj.year} books={yearObj.books} />;
            })
        }
        </div>
    );
}

function mapStateToProps(state) {
    return { books: state.books };
}

export default connect(mapStateToProps)(YearGrouping);
