/* ============ CONSTANTS =============== */  

const SET_BOOKS = 'SET_BOOKS';
const ADD_BOOK = 'ADD_BOOK';
const EDIT_BOOK = 'EDIT_BOOK'

/* ============ ACTION CREATORS =============== */  

export const setBooks = function (books) {
    console.log("creating a book action"); 
    return {
        type: SET_BOOKS,
        books: books 
    } 
};

export const addBook = book => ({
    type: ADD_BOOK, 
    newBook: book 
});

export const editBook = book => ({
  type: EDIT_BOOK, 
  editedBook: book
})



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
      newState = newState.map( (book) => {return book.id === editedBook.id ? editedBook : book} )

    default:
      return state;

  }

  return newState;

}

