/* ============ CONSTANTS =============== */  

const SET_BOOK = 'SET_BOOK';

/* ============ ACTION CREATORS =============== */  

export const setBook = function (book) {
    console.log("creating a book action"); 
    return {
        type: SET_BOOK,
        book: book 
    } 
};

/* ============ REDUCER =============== */  

export default function (state = {}, action) {
    console.log("In the reducer")
    console.log("With this action:", action)

  switch (action.type) {

    case SET_BOOK:
      return Object.assign({}, state, action.book)
    
    default:
      return state;

  }

}
