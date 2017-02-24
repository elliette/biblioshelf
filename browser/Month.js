import React, { Component } from 'react';


export default class Month extends Component {

	constructor (props) {
    	super(props);
  	}

  render() {
    return(
    <div>
	    <h1>{this.props.monthDetails.month}, {this.props.monthDetails.year}</h1> 
	    <hr/>
	    <ul>
	    {this.props.monthDetails.books.map(function(book){
	    	return (
		    	<ul key={book.id} >
		    		<img src={book.url} height="250"/>
					<li className="title">{book.title}</li>
					<li className="author">{book.author}</li>
				</ul> 
			)
	    })}
	    </ul> 
	</div> 




      ); 
  } 
} 