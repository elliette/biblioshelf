import React, { Component } from 'react';
import axios from 'axios';
import { GOOGLE_BOOKS_API } from '../../secrets.js';
import { setGoogleBooks } from '../reducers/googleBooksReducer';
import { setGoogleBook, removeGoogleBook } from '../reducers/singleGoogleBookReducer';
import { connect } from 'react-redux';
import DatePicker from 'react-bootstrap-date-picker';
import { addBook } from '../reducers/booksReducer';
import { browserHistory } from 'react-router';


const getBookInfo = (bookObj) => {
	let key = bookObj.id;
	let bookInfo = bookObj.volumeInfo;
	let author = bookInfo.authors ? bookInfo.authors.join(', ') : 'Unknown';
	let imageURL = bookInfo.imageLinks ? bookInfo.imageLinks.thumbnail : `https://www.mobileread.com/forums/attachment.php?attachmentid=11128${Math.floor(Math.random() * 4) + 1}&d=1378756884`;
	let title = bookInfo.title ? bookInfo.title : 'Unknown';
	return {key, author, imageURL, title};
};

class GoogleBooksSearch extends Component {
    constructor (props) {
        super(props);
        this.state = {query: '', date: null };
        this.handleChange = this.handleChange.bind(this);
        this.searchSubmit = this.searchSubmit.bind(this);
        this.finalSubmit = this.finalSubmit.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
    }

	handleChange(event) {
		event.preventDefault();
		this.setState( {query: event.target.value} );
	}

	handleDateChange(value) {
        this.setState({
            date: value
        });
    }

	searchSubmit(event) {
		event.preventDefault();
		if (!this.state.query) return;
		let query = this.state.query.split(' ').join('%20');
		axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}&orderBy=relevance&key=${GOOGLE_BOOKS_API}`)
		.then(res => res.data.items)
		.then(books => books.map(book => getBookInfo(book)))
		.then(bookInfo => this.props.setBooks(bookInfo));
	}


	handleClick(book) {
		this.props.setSingleBook(book);
	}

	finalSubmit(event) {
        event.preventDefault();
        var bookToAdd = this.props.selectedGoogleBook;
        var title = bookToAdd.title;
        var author = bookToAdd.author;
        var url = bookToAdd.imageURL;
        var notes = event.target.notes.value;
        var date = this.state.date;
        var starred = event.target.starred.value;
        var reqObj = { title, author, url, notes, date, starred };
        this.props.handleAddBook(reqObj);
        this.props.setBooks([]);
        this.props.removeBook();
        browserHistory.push('/addedbooksuccess');
    }

	render() {
			return (
				<div>
					<div className="jumbotron">
						<h1>Find a book:</h1>
						<form onSubmit={this.searchSubmit} >
					        <div className="form-group">
					            <input type="text" className="form-control" placeholder="Search" onChange={this.handleChange} value={this.state.query} />
					        </div>
							<button type="submit" className= {this.state.submitted ? 'btn btn-default' : 'btn btn-primary'} >{this.state.submitted ? 'Clear Search' : 'Search'}</button>
						</form>
				    </div>
				    {this.props.books.length
				    ? <div>
						<h1>Select a book:</h1>
						<hr />
						{ this.props.books.map( book =>
							<ul key={book.key} onClick={this.handleClick.bind(this, book)}>
								<img src={book.imageURL} height="200" />
									<li className="title">{book.title}</li>
									<li className="author">{book.author}</li>
							</ul>
						)}
					</div>
					: null
				}
				{Object.keys(this.props.selectedGoogleBook).length
					?
					<div>
						<h1>Add notes to <i>{this.props.selectedGoogleBook.title}:</i></h1>
						<hr />
						<form className="add-book-form" onSubmit={this.finalSubmit}>
							<div className="form-group">
								<label htmlFor="notes" className="col-sm-2 control-label">Notes *</label>
								<div className="col-sm-10">
									<textarea name="notes" rows="5" type="text" className="form-control" />
								</div>
							</div>
		                    <div className="form-group">
		                        <label htmlFor="date" className="col-sm-2 control-label">Date Read</label>
		                        <div className="col-sm-10">
		                            <DatePicker onChange={this.handleDateChange} value={this.state.date} />
		                        </div>
		                    </div>
							<div className="form-group">
		                        <label htmlFor="starred" className="col-sm-2 control-label">Favorited</label>
		                        <div className="col-sm-10">
		                            <select name="starred">
		                                <option>no</option>
		                                <option>yes</option>
		                            </select>
		                        </div>
							</div>
							<p className="side-note">* Bookshelf supports notes written in Markdown!</p>
		                    <div className="col-sm-offset-10 col-sm-10">
		                        <button type="submit" className="btn btn-primary btn-lg">Submit</button>
		                    </div>
						</form>
					</div>
					: null
				}
			    </div>
			);
		}
}

const addBookToDB = (book) => {
	return (dispatch) => {
		axios.post(`/api/books`, book)
		.then((res) => res.data)
		.then((newBook) => dispatch(addBook(newBook)));
	};
};

function mapStateToProps(state) {
    return { books: state.googleBooks, selectedGoogleBook: state.selectedGoogleBook };
}

const mapDispatchToProps = (dispatch) => {
	return {
		setBooks: (books) => dispatch(setGoogleBooks(books)),
		setSingleBook: (book) => dispatch(setGoogleBook(book)),
		removeBook: () => dispatch(removeGoogleBook()),
		handleAddBook: (book) => dispatch(addBookToDB(book))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(GoogleBooksSearch);
