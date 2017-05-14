import React from 'react';
import { connect } from 'react-redux';
import Books from './Books';

function groupByMonth (listOfBooks) {
    var months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];
    var booksByMonthObj = listOfBooks.reduce((booksGroupedByMonth, book) => {
        var date = new Date(book.date);
        var month = months[date.getMonth()];
        var year = date.getFullYear();
        var monthYear = `${month} ${year}`;
        if (!booksGroupedByMonth[monthYear]){
            booksGroupedByMonth[monthYear] = {monthYear: monthYear, books: [] };
        }
        booksGroupedByMonth[monthYear].books.push(book);
        return booksGroupedByMonth;
    }, {});

    var sortedMonthArray = Object.keys(booksByMonthObj).sort( (monthA, monthB) => {
        if (new Date(monthA) < new Date(monthB))  return 1;
        if (new Date(monthB) < new Date(monthA)) return -1;
        return 0;
    });

    return sortedMonthArray.reduce( (finalBooksArray, monthYear) => {
        finalBooksArray.push(booksByMonthObj[monthYear]);
        return finalBooksArray;
    }, []);
}

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
