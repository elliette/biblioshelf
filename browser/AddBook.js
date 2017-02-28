import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-bootstrap-date-picker';
import {hashHistory} from "react-router";

export default class Book extends Component {

    constructor (props) {
    super(props);
    this.state = {}; 
    this.handleSubmit = this.handleSubmit.bind(this); 
    this.handleDateChange = this.handleDateChange.bind(this); 
  }

  handleDateChange(value) {
    this.setState({
      date: value
    });
  }; 

  handleSubmit(event){
    event.preventDefault(); 
    console.log("***********SUBMIT WAS HIT*************"); 
    var title = event.target.title.value; 
    var author = event.target.author.value; 
    var url = event.target.url.value; 
    var notes = event.target.notes.value; 
    var date = this.state.date; 
    var starred = event.target.starred.value; 

    var reqObj = {
        title: title, 
        author: author, 
        url: url, 
        notes: notes, 
        date: date, 
        starred: starred
    } 

    axios.post(`/addbook`, reqObj)
    .then(function(res){
        console.log("RESPONSE", res); 
        return res.data
    })
    .then(function(book){
        console.log("BOOK HAS BEEN ADDED!"); 
        console.log("id", book.id); 
        hashHistory.push('/message');
    })
} 

  render (){
    return (
    <div> 
        <h3>Add a Book</h3>
        <hr/>
        <form onSubmit={this.handleSubmit} >
            <div className="form-group">
                <label htmlFor="title" className="col-sm-2 control-label">Book Title</label>
                <div className="col-sm-10">
                    <input name="title" type="text" className="form-control" />
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="author" className="col-sm-2 control-label">Author Name</label>
                <div className="col-sm-10">
                    <input name="author" type="text" className="form-control" />
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="url" className="col-sm-2 control-label">Cover Image URL</label>
                <div className="col-sm-10">
                    <input name="url" type="text" className="form-control" />
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="notes" className="col-sm-2 control-label">Notes</label>
                <div className="col-sm-10">
                    <textarea name="notes" rows="5" type="text" className="form-control" ></textarea>
                </div>
            </div>
            <hr/>
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

            <div className="col-sm-offset-2 col-sm-10">
                <button type="submit" className="btn btn-primary">submit</button>
            </div>
        </form>
    </div> 


        )
  }
}



