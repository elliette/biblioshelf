import {SET_BOOKS, ADD_BOOK, EDIT_BOOK, DELETE_BOOK} from './constants';

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


/* ============ REDUCER =============== */

export default function(bookState = [], action) {
    console.log('In the reducer');
    console.log('With this action:', action);

    console.log("Book STATE IS", bookState);

    let newState = bookState.slice();

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

    default:
      return bookState;

  }
  return newState;
}
