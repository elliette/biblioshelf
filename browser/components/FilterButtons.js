import React from 'react';
import { connect } from 'react-redux';
import { setVisibility } from '../reducers/visibilityFilterReducer';

import { setBooks, setFavBooks } from '../reducers/booksReducer';
import axios from 'axios';

export const allBooks = 'show all books';
export const byYear = 'group books by year';
export const byMonth = 'group books by month';
export const favBooks = 'show favorite books';

const selectedBtn = 'btn btn-link';
const normalBtn = 'btn btn-link unselected';

function FilterButtons ({ visibilityFilter, handleFilterBooks, handleGetFavBooks }) {

    function toggleButton (selectedOption) {
        return visibilityFilter === selectedOption ? selectedBtn : normalBtn;
    }

    return (
        <div className="navbar-left">
        <button type="button" className={toggleButton(allBooks)} onClick={() => handleFilterBooks(allBooks) } >[Show All Books]</button>
        <button type="button" className={toggleButton(byYear)} onClick={() => handleFilterBooks(byYear)} >[Group Books By Year]</button>
        <button type="button" className={toggleButton(byMonth)} onClick={() => handleFilterBooks(byMonth)}>[Group Books by Month]</button>
        <button type="button" className={toggleButton(favBooks)} onClick={() => handleGetFavBooks() }>[Show Favorited Books]</button>
        </div>
    );
}

const filterBooks = (filter) => {
    return (dispatch) => {
        axios.get('/api/books')
        .then( res => res.data)
        .then(books => dispatch(setBooks(books)))
        .then(() => dispatch(setVisibility(filter)));
    };
};

const getFavBooks = () => {
    return (dispatch) => {
        dispatch(setFavBooks());
        dispatch(setVisibility(favBooks));
    };
};

function mapStateToProps(state) {
    return { visibilityFilter: state.visibilityFilter };
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleFilterBooks: (filter) => dispatch(filterBooks(filter)),
        handleGetFavBooks: () => dispatch(getFavBooks())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterButtons);
