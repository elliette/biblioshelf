import React from 'react';
import { connect } from 'react-redux';
import MonthGrouping from './MonthGrouping';
import YearGrouping from './YearGrouping';
import PleaseAddBooks from '../messages/PleaseAddBooks';
import Books from './Books';
import PleaseSignUp from '../messages/PleaseSignUp';
import { allBooks, byYear, byMonth, favBooks, queriedBook } from '../reducers/visibilityFilterReducer';

function Home ({ books, user, visibilityFilter }) {

    if (!user.id){
       return ( <PleaseSignUp /> );
    } else if (!books.length){
        return ( <PleaseAddBooks /> );
    } else if (visibilityFilter === byMonth) {
        return ( <MonthGrouping /> );
    } else if (visibilityFilter === byYear){
        return ( <YearGrouping /> );
    } else if (visibilityFilter === favBooks) {
        return ( <Books title="Favorite Books" books={books} /> );
    } else if (visibilityFilter === queriedBook) {
        return ( <Books title="Search Results" books={books} /> );
    } else if (visibilityFilter === allBooks) {
        return ( <Books title="All Books" books={books} /> );
    }
}

function mapStateToProps(state) {
    return { books: state.books, user: state.auth, visibilityFilter: state.visibilityFilter };
}

export default connect(mapStateToProps)(Home);
