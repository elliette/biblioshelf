import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import {setVisibility, HAVE_READ, TO_READ, FAVORITES, BY_YEAR, BY_MONTH } from '../reducers/visibilityFilterReducer';
import { setToReadBooks, setHaveReadBooks, setFavBooks } from '../reducers/booksReducer';
import { getVisibleBooks } from '../utilities';


const FilterButtons = ({ visibilityFilter, filterBooks, getFavBooks, getToReadBooks, books }) => {

    function toggleButton (selectedOption) {
        return visibilityFilter === selectedOption ? 'btn btn-link' : 'btn btn-link unselected';
    }

    if (visibilityFilter === TO_READ){
        return (
        <div className="navbar-left filter-buttons">
            <button type="button" className="btn btn-primary" id="toggle-left" onClick={() => filterBooks(HAVE_READ) } >Have Read List</button>
            <button type="button" className="btn btn-primary disabled" id="toggle-right" >To Read List</button>
        </div>
        );
    } else {
        return (
            <div className="navbar-left filter-buttons">
                <button type="button" className={toggleButton(HAVE_READ)} onClick={() => filterBooks(HAVE_READ, books) } >[Show All Books]</button>
                <button type="button" className={toggleButton(BY_YEAR)} onClick={() => filterBooks(BY_YEAR, books)} >[Group Books By Year]</button>
                <button type="button" className={toggleButton(BY_MONTH)} onClick={() => filterBooks(BY_MONTH, books)}>[Group Books by Month]</button>
                <button type="button" className={toggleButton(FAVORITES)} onClick={() => filterBooks(FAVORITES, books) }>[Show Favorited Books]</button>
                <button type="button" className="btn btn-primary disabled" id="toggle-left">Have Read List</button>
                <button type="button" className="btn btn-primary" id="toggle-right" onClick={() => filterBooks(TO_READ, books) }>To Read List</button>
            </div>
        );
    }
};

const filterBooks = (filter, books) => {
    return (dispatch) => dispatch(setVisibility(filter));
};

//     return (dispatch) => {
//         axios.get('/api/books')
//         .then( res => res.data)
//         .then(books => dispatch(setHaveReadBooks(books)))
//         .then(() => dispatch(setVisibility(filter)));
//     };
// };

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

const mapStateToProps = ({ visibilityFilter, books }) =>  {
    return { visibilityFilter, books };
};

export default connect(mapStateToProps, { filterBooks, getFavBooks, getToReadBooks })(FilterButtons);
