'use strict';

import { TO_READ, FAVORITES, QUERIED } from './reducers/visibilityFilterReducer';

export const getVisibleBooks = (books, filter, queriedBooks) => {
    switch (filter) {
        case TO_READ:
            return books.filter( book => book.toRead === 'yes');
        case FAVORITES:
            return books.filter( book => book.starred === 'yes');
        case QUERIED:
            return queriedBooks;
        default:
            return books.filter( book => book.toRead === 'no');
    }
};

export const getBookInfo = (bookObj) => {
	let key = bookObj.id;
	let bookInfo = bookObj.volumeInfo;
	let author = bookInfo.authors ? bookInfo.authors.join(', ') : 'Unknown';
	let imageURL = bookInfo.imageLinks ? bookInfo.imageLinks.thumbnail : '/generic_book.jpg';
	let title = bookInfo.title ? bookInfo.title : 'Unknown';
	return {key, author, imageURL, title};
};

export const sortBooks = (listOfBooks) => {
	return listOfBooks.sort( (bookA, bookB) => {
		if (bookA.date < bookB.date){
			return 1;
		} else if (bookB.date < bookA.date){
			return -1;
		}
		return 0;
	});
};

export const groupByMonth = (listOfBooks) => {
    const months = [
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
    const booksByMonthObj = listOfBooks.reduce((booksGroupedByMonth, book) => {
        let date = new Date(book.date);
        let month = months[date.getMonth()];
        let year = date.getFullYear();
        let monthYear = `${month} ${year}`;
        if (!booksGroupedByMonth[monthYear]){
            booksGroupedByMonth[monthYear] = {monthYear: monthYear, books: [] };
        }
        booksGroupedByMonth[monthYear].books.push(book);
        return booksGroupedByMonth;
    }, {});

    const sortedMonthArray = Object.keys(booksByMonthObj).sort( (monthA, monthB) => {
        if (new Date(monthA) < new Date(monthB))  return 1;
        if (new Date(monthB) < new Date(monthA)) return -1;
        return 0;
    });

    return sortedMonthArray.reduce( (finalBooksArray, monthYear) => {
        finalBooksArray.push(booksByMonthObj[monthYear]);
        return finalBooksArray;
    }, []);
};

export const groupByYear = (listOfBooks) => {
    const booksByYearObj = listOfBooks.reduce((booksGroupedByYear, book) => {
        let year = new Date(book.date).getFullYear();
        if (!booksGroupedByYear[year]){
            booksGroupedByYear[year] = {year: year, books: [] };
        }
        booksGroupedByYear[year].books.push(book);
        return booksGroupedByYear;
    }, {});

    const sortedYearArray = Object.keys(booksByYearObj).sort( (yearA, yearB) => {
        if (yearA < yearB) return 1;
        if (yearB < yearA) return -1;
        return 0;
    });

    return sortedYearArray.reduce( (finalBooksArray, year) => {
        finalBooksArray.push(booksByYearObj[year]);
        return finalBooksArray;
    }, []);
};
