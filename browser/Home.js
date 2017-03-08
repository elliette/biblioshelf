import React from 'react';
import Month from './Month'; 
import WelcomeMessage from './WelcomeMessage'; 

export default function Home ({ books }) {

    console.log("BOOKS!!!!!", books); 

    function groupByMonthAndYear(books) {

        var result = []; 

        books.forEach(function(book){
            var newMonth = true
            result.forEach(function(monthObj){
                if (monthObj.monthYear === book.monthYear){
                    monthObj.books.push(book); 
                    newMonth= false; 
                }
            })
            if (newMonth === true){
                var newMonthObj = {
                    monthYear: book.monthYear, 
                    time: book.date, 
                    books: [book]
                }
                result.push(newMonthObj)
            }
        })
        return result.sort(function(a, b) {return (a.time < b.time) ? 1 : ((b.time < a.time) ? -1 : 0);} ); 
    }

    var booksByMonth = groupByMonthAndYear(books); 


    console.log(booksByMonth)
    
    return (
        <div> 
            {booksByMonth.length === 0
                ? <WelcomeMessage /> 
                : booksByMonth.map(function(monthObj){
                    return <Month title={monthObj.monthYear} books={monthObj.books} /> 
                })
            }
        </div> 
    )
}







