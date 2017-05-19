import React from 'react';
import { connect } from 'react-redux';
import {setVisibility, HAVE_READ, TO_READ, FAVORITES, BY_YEAR, BY_MONTH } from '../reducers/visibilityFilterReducer';

const FilterButtons = ({ visibilityFilter, filterBooks }) => {

    function toggleButton (selectedOption) {
        return visibilityFilter === selectedOption ? 'btn btn-link' : 'btn btn-link unselected';
    }

    if (visibilityFilter === TO_READ){
        return (
        <div className="filter-buttons">
            <button type="button" className="btn btn-primary" id="toggle-left" onClick={() => filterBooks(HAVE_READ) } >Have Read List</button>
            <button type="button" className="btn btn-primary disabled" id="toggle-right" >To Read List</button>
        </div>
        );
    } else {
        return (
            <div className="filter-buttons">
                <button type="button" className={toggleButton(HAVE_READ)} onClick={() => filterBooks(HAVE_READ) } >[Show All Books]</button>
                <button type="button" className={toggleButton(BY_YEAR)} onClick={() => filterBooks(BY_YEAR)} >[Group Books By Year]</button>
                <button type="button" className={toggleButton(BY_MONTH)} onClick={() => filterBooks(BY_MONTH)}>[Group Books by Month]</button>
                <button type="button" className={toggleButton(FAVORITES)} onClick={() => filterBooks(FAVORITES) }>[Show Favorited Books]</button>
                <button type="button" className="btn btn-primary disabled" id="toggle-left">Have Read List</button>
                <button type="button" className="btn btn-primary" id="toggle-right" onClick={() => filterBooks(TO_READ) }>To Read List</button>
            </div>
        );
    }
};

const filterBooks = (filter) => {
    return (dispatch) => dispatch(setVisibility(filter));
};

const mapStateToProps = ({ visibilityFilter, books }) =>  {
    return { visibilityFilter, books };
};

export default connect(mapStateToProps, { filterBooks })(FilterButtons);
