import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import axios from 'axios';
import DatePicker from 'react-bootstrap-date-picker';
import { setGoogleBooks } from '../reducers/googleBooksReducer';
import { setGoogleBook, removeGoogleBook } from '../reducers/singleGoogleBookReducer';
import { addBook } from '../reducers/booksReducer';
import { getBookInfo } from '../utilities';
import { GOOGLE_BOOKS_API } from '../../secrets';

class AddBookForm extends Component {
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
		.then(booksWithInfo => this.props.setGoogleBooks(booksWithInfo));
	}

	handleClick(book) {
		this.props.setGoogleBook(book);
	}

	finalSubmit(event) {
        event.preventDefault();
        const bookToAdd = this.props.selectedGoogleBook;
        const title = bookToAdd.title;
        const author = bookToAdd.author;
        const url = bookToAdd.imageURL;
        const notes = event.target.notes.value;
        const date = this.state.date;
        const starred = event.target.starred.value;
        this.props.addBookToDB({ title, author, url, notes, date, starred });
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
			    {this.props.googleBooks.length
			    ? <div>
					<h1>Select a book:</h1>
					<hr />
					{ this.props.googleBooks.map( book =>
						<a className="book-option" key={book.key} ><ul onClick={this.handleClick.bind(this, book)}>
							<img className="book-list-image" src={book.imageURL} />
								<li className="title">{book.title}</li>
								<li className="author">{book.author}</li>
						</ul></a>
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
		.then((newBook) => dispatch(addBook(newBook)))
		.then(() => dispatch(setGoogleBooks([])))
		.then(() => dispatch(removeGoogleBook()))
		.then(() => browserHistory.push('/addedbooksuccess'));
	};
};

const mapStateToProps = ({ googleBooks, selectedGoogleBook }) => {
    return { googleBooks, selectedGoogleBook };
};

export default connect(mapStateToProps, { setGoogleBooks, setGoogleBook, addBookToDB })(AddBookForm);
