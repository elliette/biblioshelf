import React from 'react';
import { connect } from 'react-redux';
import Books from './Books';
import MonthGrouping from './MonthGrouping';
import YearGrouping from './YearGrouping';
import FilterButtons from './FilterButtons';
import PleaseAddBooks from '../messages/PleaseAddBooks';
import PleaseSignUp from '../messages/PleaseSignUp';
import { readBooks, toReadBooks, byYear, byMonth, favBooks, queriedBook } from '../reducers/visibilityFilterReducer';

const Home = ({ books, user, visibilityFilter }) => {
    if (!user.id){
       return ( <PleaseSignUp /> );
    } else if (!books.length){
        return (
            <div>
                <FilterButtons />
                <PleaseAddBooks title={visibilityFilter} />
            </div>
        );
    } else if (visibilityFilter === toReadBooks) {
        return (
            <div>
                <FilterButtons />
                <Books title="Your To-Read Books:" books={books} />
            </div>
        );
    } else if (visibilityFilter === byMonth) {
        return (
        <div>
            <FilterButtons />
            <MonthGrouping />
        </div>
        );
    } else if (visibilityFilter === byYear){
        return (
        <div>
            <FilterButtons />
            <YearGrouping />
        </div>
        );
    } else if (visibilityFilter === favBooks) {
        return (
        <div>
            <FilterButtons />
            <Books title="Your Favorited Books:" books={books} />
        </div>
        );
    } else if (visibilityFilter === queriedBook) {
        return (
        <div>
            <FilterButtons />
            <Books title="Search Results:" books={books} />
        </div>
        );
    } else if (visibilityFilter === readBooks) {
        return (
        <div>
            <FilterButtons />
            <Books title="Your Read Books:" books={books} />
        </div>
        );
    }
};

const mapStateToProps = ({ books, user, visibilityFilter }) => {
    return { books, user, visibilityFilter };
};

export default connect(mapStateToProps)(Home);
