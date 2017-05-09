import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { filterBooks, setBooks } from '../reducers/booksReducer';

class SearchBar extends Component {
    constructor (props) {
        super(props);
        this.state = {query: '', submitted: false};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

	handleChange(event) {
		event.preventDefault();
		this.setState( {query: event.target.value} );
	}

	handleSubmit(event) {
		event.preventDefault();
		if (!this.state.submitted){
			this.setState({submitted: true});
			let query = this.state.query;
			axios.get(`/api/books/search/${query}`)
			.then(books => books.data)
			.then(booksArr => booksArr.map( book => book.id) )
			.then(this.props.filterFoundBooks);
		} else {
			this.setState({submitted: false});
			this.setState({query: ''});
			axios.get('/api/books')
			.then(books => books.data)
			.then(this.props.setAllBooks);
		}
	}

	render() {
		return (
		    <form className="navbar-form navbar-left" onSubmit={this.handleSubmit} >
		        <div className="form-group">
		            <input type="text" className="form-control" placeholder="Search" onChange={this.handleChange} value={this.state.query} />
		        </div>
		        <button type="submit" className= {this.state.submitted ? 'btn btn-default' : 'btn btn-primary'} >{this.state.submitted ? 'Clear Search' : 'Search'}</button>
		    </form>
		);
	}
}

function mapStateToProps(state) {
    return { books: state.books };
}

const mapDispatchToProps = (dispatch) => {
	return {
		filterFoundBooks: (bookIds) => dispatch(filterBooks(bookIds)),
		setAllBooks: (books) => dispatch(setBooks(books))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
