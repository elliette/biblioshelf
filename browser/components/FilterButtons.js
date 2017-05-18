import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import {setVisibility, readBooks, favBooks, byYear, byMonth, toReadBooks } from '../reducers/visibilityFilterReducer';
import { setToReadBooks, setBooks, setFavBooks } from '../reducers/booksReducer';


const FilterButtons = ({ visibilityFilter, filterBooks, getFavBooks, getToReadBooks }) => {

    function toggleButton (selectedOption) {
        return visibilityFilter === selectedOption ? 'btn btn-link' : 'btn btn-link unselected';
    }

    if (visibilityFilter === toReadBooks){
        return (
            <div className="navbar-left filter-buttons">
                <button type="button" className="btn btn-default" onClick={() => filterBooks(readBooks) } >Already Read List</button>
            </div>
        );
    } else {
        return (
            <div className="navbar-left filter-buttons">
                <button type="button" className="btn btn-default" onClick={() => getToReadBooks(toReadBooks) }>To Read List</button>
                <button type="button" className={toggleButton(readBooks)} onClick={() => filterBooks(readBooks) } >[Show All Books]</button>
                <button type="button" className={toggleButton(byYear)} onClick={() => filterBooks(byYear)} >[Group By Year]</button>
                <button type="button" className={toggleButton(byMonth)} onClick={() => filterBooks(byMonth)}>[Group by Month]</button>
                <button type="button" className={toggleButton(favBooks)} onClick={() => getFavBooks() }>[Show Favorite Books]</button>
            </div>
        );
    }

};

const filterBooks = (filter) => {
    return (dispatch) => {
        axios.get('/api/books')
        .then( res => res.data)
        .then(books => dispatch(setBooks(books)))
        .then(() => dispatch(setVisibility(filter)));
    };
};

const getToReadBooks = (filter) => {
    return (dispatch) => {
        axios.get('/api/books')
        .then( res => res.data)
        .then(books => dispatch(setToReadBooks(books)))
        .then(() => dispatch(setVisibility(filter)));
    };
};

const getFavBooks = () => {
    return (dispatch) => {
        dispatch(setFavBooks());
        dispatch(setVisibility(favBooks));
    };
};

const mapStateToProps = ({ visibilityFilter }) =>  {
    return { visibilityFilter };
};

export default connect(mapStateToProps, { filterBooks, getFavBooks, getToReadBooks })(FilterButtons);
