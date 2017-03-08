import axios from 'axios'; 
import { hashHistory } from 'react-router';

/* ============ CONSTANTS =============== */  

const SET_BOOKS = 'SET_BOOKS';
const ADD_BOOK = 'ADD_BOOK';
const EDIT_BOOK = 'EDIT_BOOK';
const DELETE_BOOK = 'DELETE_BOOK';

/* ============ ACTION CREATORS =============== */  

export const setLyrics = text => ({
  type: SET_LYRICS,
  text
});


export const setBooks = function (books) {
    console.log("creating a book action"); 
    return {
        type: SET_BOOKS,
        books: books 
    } 
};

export const deleteBook = function(deletedId) {
  return {
    type: DELETE_BOOK, 
    deletedId: deletedId
  }
}

export const deleteBookFromDB = (bookId) => {
  return dispatch => {
    return axios.delete(`/delete/${bookId}`)
      .then(res => {
        console.log(res.data); 
        dispatch(deleteBook(res.data));
      })
      .then( () => {

        console.log("DELETING A BOOK WAS SUCESSFUL!!")
        hashHistory.push(`/books/delete/${bookId}`)
        } )
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

export default function (state = [], action) {
    console.log("In the reducer")
    console.log("With this action:", action)

  let newState = state.slice(0); 

  switch (action.type) {

    case SET_BOOKS:
      newState = action.books;
      break;

    case ADD_BOOK:
      newState = [...newState, action.newBook ]; 
      break;

    case EDIT_BOOK: 
      newState = newState.map( (book) => {return book.id === action.editedBook.id ? action.editedBook : book} )

    case DELETE_BOOK: 
      return newState.filter(book => book.id !== action.deletedId);

    default:
      return state;

  }

  return newState;

}

