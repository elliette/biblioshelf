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
};

export const groupByYear = (listOfBooks) => {
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
};
