'use strict';

/* ============ CONSTANTS =============== */

export const SET_BOOKS = 'SET_BOOKS';
export const ADD_BOOK = 'ADD_BOOK';
export const EDIT_BOOK = 'EDIT_BOOK';
export const DELETE_BOOK = 'DELETE_BOOK';
export const CLEAR_BOOKS = 'CLEAR_BOOKS';

/* ============ ACTION CREATORS =============== */

export const setBooks = function (books) {
    return {
        type: SET_BOOKS,
        books: books
    };
};

export const clearBooks = function () {
    return {
        type: CLEAR_BOOKS,
    };
};

export const deleteBook = function(deletedId) {
    return {
        type: DELETE_BOOK,
        deletedId: deletedId
    };
};

export const addBook = book => ({
    type: ADD_BOOK,
    newBook: book
});

export const editBook = book => ({
  type: EDIT_BOOK,
  editedBook: book
});

/* ============ REDUCER =============== */

export default (state = [], action) =>  {

    let newState = state.slice();
    switch (action.type) {
        case SET_BOOKS:
            newState = action.books;
            break;
        case CLEAR_BOOKS:
            newState = [];
            break;
        case ADD_BOOK:
            newState = [...newState, action.newBook ];
            break;
        case EDIT_BOOK:
            newState = newState.map( (book) => book.id === action.editedBook.id ? action.editedBook : book);
            break;
        case DELETE_BOOK:
            newState = newState.filter( (book) => book.id !== action.deletedId);
            break;
        default:
            return state;
    }
    return newState;
};
