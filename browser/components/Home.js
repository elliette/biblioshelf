import React from 'react';
import { connect } from 'react-redux';
import Books from './Books';
import MonthGrouping from './MonthGrouping';
import YearGrouping from './YearGrouping';
import FilterButtons from './FilterButtons';
import PleaseAddBooks from '../messages/PleaseAddBooks';
import PleaseSignUp from '../messages/PleaseSignUp';
import { getVisibleBooks } from '../utilities';
import { HAVE_READ, TO_READ, BY_YEAR, BY_MONTH, FAVORITES, QUERIED } from '../reducers/visibilityFilterReducer';

const Home = ({ books, user, visibilityFilter }) => {
    console.log('books are', books);
    if (!user.id){
       return ( <PleaseSignUp /> );
    } else if (!books.length){
        return (
            <div>
                <FilterButtons />
                <PleaseAddBooks title={visibilityFilter} />
            </div>
        );
    } else if (visibilityFilter === TO_READ) {
        return (
            <div>
                <FilterButtons />
                <Books title="Your To-Read Books:" books={books} />
            </div>
        );
    } else if (visibilityFilter === BY_MONTH) {
        return (
        <div>
            <FilterButtons />
            <MonthGrouping />
        </div>
        );
    } else if (visibilityFilter === BY_YEAR){
        return (
        <div>
            <FilterButtons />
            <YearGrouping />
        </div>
        );
    } else if (visibilityFilter === FAVORITES) {
        return (
        <div>
            <FilterButtons />
            <Books title="Your Favorited Books:" books={books} />
        </div>
        );
    } else if (visibilityFilter === QUERIED) {
        return (
        <div>
            <FilterButtons />
            <Books title="Search Results:" books={books} />
        </div>
        );
    } else if (visibilityFilter === HAVE_READ) {
        return (
        <div>
            <FilterButtons />
            <Books title="Your Read Books:" books={books} />
        </div>
        );
    }
};

const mapStateToProps = ({ books, user, visibilityFilter }) => {
    return {
        books: getVisibleBooks(books, visibilityFilter),
        user,
        visibilityFilter,
    };
};

export default connect(mapStateToProps)(Home);
