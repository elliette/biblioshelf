import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import axios from 'axios';
import Scroll from 'react-scroll';
import DatePicker from 'react-bootstrap-date-picker';
import { setGoogleBooks } from '../reducers/googleBooksReducer';
import { setGoogleBook, removeGoogleBook } from '../reducers/singleGoogleBookReducer';
import { addBook } from '../reducers/booksReducer';
import { getBookInfo } from '../utilities';
import {HAVE_READ, TO_READ, setVisibility}  from '../reducers/visibilityFilterReducer';

const scroll = Scroll.animateScroll;

class AddBookForm extends Component {
    constructor (props) {
        super(props);
        this.state = {query: '', date: null, toRead: null};
        this.handleChange = this.handleChange.bind(this);
        this.searchSubmit = this.searchSubmit.bind(this);
        this.haveReadSubmit = this.haveReadSubmit.bind(this);
        this.toReadSubmit = this.toReadSubmit.bind(this);
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
		axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}&orderBy=relevance&key=AIzaSyCScXMIHvY-1NqdW5ukCcB1IddsLXd7VJw`)
		.then(res => res.data.items)
		.then(books => books.map(book => getBookInfo(book)))
		.then(booksWithInfo => this.props.setGoogleBooks(booksWithInfo))
		.then(() => scroll.scrollToBottom() );
	}

	handleClick(book) {
		this.props.setGoogleBook(book);
		scroll.scrollToBottom();
	}

	handleOption(option) {
		this.setState({toRead: option});
		scroll.scrollToBottom();
	}

	toReadSubmit(event) {
		event.preventDefault();
		const bookToAdd = this.props.selectedGoogleBook;
		const title = bookToAdd.title;
        const author = bookToAdd.author;
        const url = bookToAdd.imageURL;
        const toRead = 'yes';
        this.props.addBookToDB({ title, author, url, toRead });
        this.props.changeVisibility(TO_READ);
	}

	haveReadSubmit(event) {
        event.preventDefault();
        const bookToAdd = this.props.selectedGoogleBook;
        const title = bookToAdd.title;
        const author = bookToAdd.author;
        const url = bookToAdd.imageURL;
        const notes = event.target.notes.value;
        const date = this.state.date;
        const starred = event.target.starred.value;
        const toRead = 'no';
        this.props.addBookToDB({ title, author, url, notes, date, starred, toRead });
        this.props.changeVisibility(HAVE_READ);
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
				<div className="jumbotron">
					<h2>Is this a book that you've already read or that you want to save to read later?</h2>
					<div className="bottom-buttons">
                        <button type="button" className="btn btn-link" onClick={() => this.handleOption('no')}><h3>[Already Read]</h3></button>
                        <button type="button" className="btn btn-link" onClick={() => this.handleOption('yes')}><h3>[Read Later]</h3></button>
					</div>
                </div>
                : null
            }
			{Object.keys(this.props.selectedGoogleBook).length  && this.state.toRead === 'yes'
				?
				<div className="col-sm-offset-10 col-sm-10">
					<button onClick={this.toReadSubmit} className="btn btn-primary btn-lg">Add to Read Later List</button>
				</div>
				: null
			}
			{Object.keys(this.props.selectedGoogleBook).length  && this.state.toRead === 'no'
				?
				<div>
					<h1>Add notes to <i>{this.props.selectedGoogleBook.title}:</i></h1>
					<hr />
					<form className="add-book-form" onSubmit={this.haveReadSubmit}>
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
	                        <button type="submit" className="btn btn-primary btn-lg">Add to Books Read List</button>
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

const changeVisibility = (filter) => {
	return (dispatch) => {
		dispatch(setVisibility(filter));
	};
};

const mapStateToProps = ({ googleBooks, selectedGoogleBook }) => {
    return { googleBooks, selectedGoogleBook };
};

export default connect(mapStateToProps, { setGoogleBooks, setGoogleBook, addBookToDB, changeVisibility })(AddBookForm);
