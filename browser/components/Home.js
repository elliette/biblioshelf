import React from 'react';
import { connect } from 'react-redux';
import BooksGroupedByMonth from '../components/BooksGroupedByMonth';
import PleaseAddBooks from '../messages/PleaseAddBooks';
import PleaseSignUp from '../messages/PleaseSignUp';

function groupByMonthAndYear(listOfBooks) {
    var result = [];
    listOfBooks.forEach(function(book){
        var newMonth = true;
        result.forEach(function(monthObj){
            if (monthObj.monthYear === book.monthYear){
                monthObj.books.push(book);
                newMonth = false;
            }
        });
        if (newMonth === true){
            var newMonthObj = {
                monthYear: book.monthYear,
                time: book.date,
                books: [book]
            };
            result.push(newMonthObj);
        }
    });
    return result.sort( (monthObj1, monthObj2) => {
        if (monthObj1.time < monthObj2.time) return 1;
        if (monthObj2.time < monthObj1.time) return -1;
        return 0;
    });
}

function Home ({ books, user }) {
    var booksByMonth = groupByMonthAndYear( books );
    if (!user.id){
       return ( <PleaseSignUp /> );
    } else {
        return (
            <div>
                {booksByMonth.length === 0
                    ? <PleaseAddBooks />
                    : booksByMonth.map(function(monthObj){
                        return <BooksGroupedByMonth key={monthObj.monthYear} title={monthObj.monthYear} books={monthObj.books} />;
                    })
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { books: state.books, user: state.auth };
}

export default connect(mapStateToProps)(Home);
