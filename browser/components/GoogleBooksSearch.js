import React, { Component } from 'react';
import axios from 'axios';
import { GOOGLE_BOOKS_API } from '../../secrets.js';
import { setGoogleBooks } from '../reducers/googleBooksReducer';
import { connect } from 'react-redux';

const getBookInfo = (bookObj) => {
	let bookInfo = bookObj.volumeInfo;
	let author = bookInfo.authors.join(', ');
	let imageURL = bookInfo.imageLinks.thumbnail;
	let title = bookInfo.title;
	return {author, imageURL, title};
};

class GoogleBooksSearch extends Component {
    constructor (props) {
        super(props);
        this.state = {query: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

	handleChange(event) {
		event.preventDefault();
		this.setState( {query: event.target.value} );
	}

	handleSubmit(event) {
		event.preventDefault();
		if (!this.state.query) return;
		let query = this.state.query.split(' ').join('%20');
		axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}&orderBy=relevance&key=${GOOGLE_BOOKS_API}`)
		.then(res => res.data.items)
		.then(books => books.map(book => getBookInfo(book)))
		.then(bookInfo => this.props.setBooks(bookInfo));
	}

	render() {
			return (
				<div>
				<div className="jumbotron">
					<h1>Find Book:</h1>
					<form onSubmit={this.handleSubmit} >
				        <div className="form-group">
				            <input type="text" className="form-control" placeholder="Search" onChange={this.handleChange} value={this.state.query} />
				        </div>
						<button type="submit" className= {this.state.submitted ? 'btn btn-default' : 'btn btn-primary'} >{this.state.submitted ? 'Clear Search' : 'Search'}</button>
					</form>
			    </div>
			    {this.props.books.length 
			    	? 
			    	<div>
					<h1>Select a book:</h1>
					{
						this.props.books.map( book =>
							<ul>
								<img src={book.imageURL} />
									<li className="title">{book.title}</li>
									<li className="author">{book.author}</li>
							</ul>
						)
					}
				</div>
			    	: null }
			    </div> 

			);
		}
}

function mapStateToProps(state) {
    return { books: state.googleBooks };
}

const mapDispatchToProps = (dispatch) => {
	return {
		setBooks: (books) => dispatch(setGoogleBooks(books)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(GoogleBooksSearch);
