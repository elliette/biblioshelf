import React from 'react';
import { connect } from 'react-redux';
import Books from './Books';

function groupByYear (listOfBooks) {
    var booksByYearObj = listOfBooks.reduce((booksGroupedByYear, book) => {
        var year = new Date(book.date).getFullYear();
        if (!booksGroupedByYear[year]){
            booksGroupedByYear[year] = {year: year, books: [] };
        }
        booksGroupedByYear[year].books.push(book);
        return booksGroupedByYear;
    }, {});

    var sortedYearArray = Object.keys(booksByYearObj).sort( (yearA, yearB) => {
        if (yearA < yearB) return 1;
        if (yearB < yearA) return -1;
        return 0;
    });

    return sortedYearArray.reduce( (finalBooksArray, year) => {
        finalBooksArray.push(booksByYearObj[year]);
        return finalBooksArray;
    }, []);
}

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
