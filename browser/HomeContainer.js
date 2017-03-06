import Home from './Home'; 
import {connect} from 'react-redux'; 

function mapStateToProps(state){
	console.log("Now in Home Container and ready to send state to Home Component")
	console.log("these are the books on my state currently", state.books)
	return {books: state.books}
}

export default connect(mapStateToProps)(Home)