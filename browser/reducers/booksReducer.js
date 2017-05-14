/* ============ CONSTANTS =============== */

export const SET_BOOKS = 'SET_BOOKS';
export const ADD_BOOK = 'ADD_BOOK';
export const EDIT_BOOK = 'EDIT_BOOK';
export const DELETE_BOOK = 'DELETE_BOOK';
export const FILTER_BOOKS = 'FILTER_BOOKS';
export const FAV_BOOKS_ONLY = 'FAV_BOOKS_ONLY';

/* ============ ACTION CREATORS =============== */

export const setBooks = function (books) {
    return {
        type: SET_BOOKS,
        books: books
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

export const filterBooks = (books) => ({
    type: FILTER_BOOKS,
    books: books
});

export const setFavBooks = () => ({
    type: FAV_BOOKS_ONLY
});

/* ============ REDUCER =============== */

export default function(state = [], action) {

let newState = state.slice();
    switch (action.type) {
        case SET_BOOKS:
            newState = action.books;
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
        case FILTER_BOOKS:
            newState = newState.filter( (book) => action.books.includes(book.id) );
            break;
        case FAV_BOOKS_ONLY:
            newState = newState.filter( (book) => book.starred === 'yes');
            break;
        default:
            return state;
    }
    return newState;
}
