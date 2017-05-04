import React from 'react';
import Month from './Month';
import WelcomeMessage from './WelcomeMessage';
import SignUpMessage from './SignUpMessage';

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
    return result.sort( (monthObj1, monthObj2) => monthObj1.time < monthObj2.time ? 1 : ((monthObj2.time < monthObj1.time) ? -1 : 0) );
}

export default function Home ({ books, user }) {
    var booksByMonth = groupByMonthAndYear( books );
    if (!user.id){
       return ( <SignUpMessage /> ) 
    } else {
        return (
            <div>
                {booksByMonth.length === 0
                    ? <WelcomeMessage />
                    : booksByMonth.map(function(monthObj){
                        return <Month key={monthObj.monthYear} title={monthObj.monthYear} books={monthObj.books} />;
                    })
                }
            </div>
        );     
    }
}
