import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { setQueriedBooks } from '../reducers/queriedBooksReducer';
import { setVisibility, QUERIED } from '../reducers/visibilityFilterReducer';

class SearchBar extends Component {
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
		let query = this.state.query;
		axios.get(`/api/books/search/${query}`)
		.then(res => res.data)
		.then(books => this.props.queryBooks(books))
		.then(this.setState({query: ''}))
		.catch(console.error);
	}

	render() {

		return (
		    <form className="navbar-form navbar-left" onSubmit={this.handleSubmit} >
		        <div className="form-group">
		            <input type="text" className="form-control" placeholder="Search" onChange={this.handleChange} value={this.state.query} />
		        </div>
		        <button type="submit" className="btn btn-primary">Search</button>
		    </form>
		);
	}
}

const queryBooks = (books) => {
    return (dispatch) => {
        dispatch(setQueriedBooks(books || []));
        dispatch(setVisibility(QUERIED));
    };
};

const mapStateToProps = ({ books }) => {
    return { books };
};

export default connect(mapStateToProps, { queryBooks })(SearchBar);
