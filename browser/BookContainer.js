import Book from './Book'; 
import {connect} from 'react-redux'; 
import {deleteBookFromDB, editBookInDB} from './book-reducer'; 


const mapDispatchToProps = (dispatch) => {
  return {
    handleDelete: (bookId) => {
      dispatch(deleteBookFromDB(bookId))
    }
  }
}

function mapStateToProps(state){
	console.log("Now in Book Container and ready to send state to Home Component")
	console.log("this is the selected book on my state", state.selectedBook)
	return {book: state.selectedBook}
}

export default connect(mapStateToProps, mapDispatchToProps)(Book)