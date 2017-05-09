import React, { Component } from 'react';
import { connect } from 'react-redux';

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
		let searchQuery = this.state.query; 
		axios.get()


	}

	render() {
		return (
		    <form className="navbar-form navbar-left" onSubmit={this.handleSubmit} >
		        <div className="form-group">
		            <input type="text" className="form-control" placeholder="Search" onChange={this.handleChange} value={this.state.query} />
		        </div>
		        <button type="submit" className="btn btn-default">Submit</button>
		    </form>
		);
	}
}

function mapStateToProps(state) {
    return { books: state.books };
}


// const mapDispatchToProps = (dispatch) => {
// 	return { handleEditBook: (book) => dispatch(editBookInDB(book)) };
// };

export default connect(mapStateToProps)(SearchBar);
