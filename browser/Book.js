import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import {hashHistory} from "react-router";
import dateFormat from 'dateformat';
import Markdown from 'react-markdown'

export default class Book extends Component {

	constructor (props) {
    super(props);
    this.state = {};
    this.handleDelete = this.handleDelete.bind(this); 
  }

  componentWillMount () {
  	var id = this.props.params.bookId; 
    axios.get(`/api/books/${id}`)
    .then((res) => {
      return res.data; 
    }) 
    .then((book) => {
      console.log(book); 
      this.setState(book); 
    })
  }

  handleDelete() {
  	var id = this.state.id; 
  	console.log(id); 
  	axios.delete(`/delete/${id}`)
    .then(function(res){
      console.log(res); 
      hashHistory.push('/')
    })
  }


render() {

	return (

	<div>
  <img className="book-image" src={this.state.url} />
  <div className="book-box">
	{this.state.starred === "yes" ? <h1>{this.state.title} <i className="fa fa-heart" aria-hidden="true"></i></h1> : <h1>{this.state.title}</h1> } 
	<h4><i>by {this.state.author}</i></h4>
  <p><b>Read on:</b> {dateFormat(this.state.date, "dddd, mmmm dS, yyyy")}</p> 
	<div className="bookNotes"><Markdown source={this.state.notes} /></div> 
  <div className="bottom-buttons">
	<Link to={`/books/edit/${this.state.id}`}><button type="button" className="btn btn-link" onClick={this.handleEdit} >[Edit Book]</button></Link> 
	<button type="button" className="btn btn-link" onClick={this.handleDelete}>[Delete Book]</button>
	</div> 
  </div> 
  </div> 

	)
}

} 


