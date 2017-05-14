import React from 'react';
import { connect } from 'react-redux';
import MonthGrouping from './MonthGrouping';
import YearGrouping from './YearGrouping';
import PleaseAddBooks from '../messages/PleaseAddBooks';
import Books from './Books';
import PleaseSignUp from '../messages/PleaseSignUp';
import { allBooks, byYear, byMonth, favBooks } from './FilterButtons';

const queriedBook = 'queried book';


function Home ({ books, user, visibilityFilter }) {

    if (!user.id){
       return ( <PleaseSignUp /> );
    } else if (!books.length){
        return (
            <PleaseAddBooks />
        );
    } else if (visibilityFilter === byMonth) {
        return (
            <div>
                <MonthGrouping />
            </div>
        );
    } else if (visibilityFilter === byYear){
        return (
            <div>
                <YearGrouping />
            </div>
        );
    } else if (visibilityFilter === favBooks) {
        return (
            <div>
                <Books title="Favorite Books" books={books} />;
            </div>
        );
    } else if (visibilityFilter === queriedBook) {
        return (
            <div>
                <Books title="Search Results" books={books} />;
            </div>
        );
    }

    else if (visibilityFilter === allBooks) {
        return (
            <div>
                <Books title="All Books" books={books} />;
            </div>
        );
    }
}


function mapStateToProps(state) {
    return { books: state.books, user: state.auth, visibilityFilter: state.visibilityFilter };
}

export default connect(mapStateToProps)(Home);
