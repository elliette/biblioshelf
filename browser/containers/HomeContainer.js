import Home from '../components/Home';
import { connect } from 'react-redux';

function mapStateToProps(state) {
    return { books: state.books };
}

export default connect(mapStateToProps)(Home);
