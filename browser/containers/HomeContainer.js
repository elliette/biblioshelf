import Home from '../components/Home';
import { connect } from 'react-redux';

function mapStateToProps(state) {
    return { books: state.books, user: state.auth };
}

export default connect(mapStateToProps)(Home);
