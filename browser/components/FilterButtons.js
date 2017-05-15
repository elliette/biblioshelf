import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { setVisibility, allBooks, favBooks, byYear, byMonth } from '../reducers/visibilityFilterReducer';
import { setBooks, setFavBooks } from '../reducers/booksReducer';

const FilterButtons = ({ visibilityFilter, books, filterBooks, getFavBooks }) => {

    function toggleButton (selectedOption) {
        return visibilityFilter === selectedOption ? 'btn btn-link' : 'btn btn-link unselected';
    }

    if (!books.length) return null;

    return (
        <div className="navbar-left filter-buttons">
            <button type="button" className={toggleButton(allBooks)} onClick={() => filterBooks(allBooks) } >[Show All Books]</button>
            <button type="button" className={toggleButton(byYear)} onClick={() => filterBooks(byYear)} >[Group Books By Year]</button>
            <button type="button" className={toggleButton(byMonth)} onClick={() => filterBooks(byMonth)}>[Group Books by Month]</button>
            <button type="button" className={toggleButton(favBooks)} onClick={() => getFavBooks() }>[Show Favorited Books]</button>
        </div>
    );
};

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

const mapStateToProps = ({ visibilityFilter, books }) =>  {
    return { visibilityFilter, books };
};

export default connect(mapStateToProps, { filterBooks, getFavBooks })(FilterButtons);
