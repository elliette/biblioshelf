import React, { Component } from 'react';
import { Link } from 'react-router';


export default class Month extends Component {

	constructor (props) {
    	super(props);
  	}

  render() {
  	if (this.props.monthDetails.books.length){
    return(
    <div>
	    <h1> {this.props.monthDetails.month} {this.props.monthDetails.year}</h1> 
	    <hr/>
	    <ul>
	    {this.props.monthDetails.books.sort(function(a,b) {return (a.date < b.date) ? 1 : ((b.date < a.date) ? -1 : 0);} ).map(function(book){
	    	return (
		    	<ul key={book.id} >
		    		<Link to={`/books/${book.id}`}>
		    		<img src={book.url} height="250"/>
					{ book.starred === "yes" ? 
						<li className="title"> <i className="fa fa-heart" aria-hidden="true"></i> {book.title}</li> 
						: <li className="title">{book.title}</li> 
					} 
					<li className="author">{book.author}</li>
					</Link> 
				</ul> 
			)
	    })}
	    </ul> 
	</div> 




      ); 
   } return null; 
  } 
} 