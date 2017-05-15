import React from 'react';
import { connect } from 'react-redux';
import Books from './Books';
import MonthGrouping from './MonthGrouping';
import YearGrouping from './YearGrouping';
import PleaseAddBooks from '../messages/PleaseAddBooks';
import PleaseSignUp from '../messages/PleaseSignUp';
import { allBooks, byYear, byMonth, favBooks, queriedBook } from '../reducers/visibilityFilterReducer';

const Home = ({ books, user, visibilityFilter }) => {

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
};

const mapStateToProps = ({ books, user, visibilityFilter }) => {
    return { books, user, visibilityFilter };
};

export default connect(mapStateToProps)(Home);
