import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-bootstrap-date-picker';
import {hashHistory} from "react-router";

export default class EditBook extends Component {

    constructor (props) {
    super(props);
    this.state = {}; 
    this.handleSubmit = this.handleSubmit.bind(this); 
    this.handleChange = this.handleChange.bind(this); 
    this.handleDateChange = this.handleDateChange.bind(this); 
  }

  componentWillMount () {
    console.log("PROPS ARE", this.props); 
    var id = this.props.params.bookId; 
    console.log("ID IS", id); 
    axios.get(`/api/books/${id}`)
    .then((res) => {
      return res.data; 
    }) 
    .then((book) => {
      this.setState(book); 
    })
  }

  handleChange(event){
    var name = event.target.name; 
    console.log("NAME~~~~", name); 
    var value = event.target.value; 
    console.log("VALUE~~~~", value); 
    var newState = {}; 
    newState[name] = value;
    this.setState(newState); 
  }

 handleDateChange(value) {
    this.setState({
      date: value
    });
  }; 

  handleSubmit(event){
    event.preventDefault(); 
    console.log("***********SUBMIT WAS HIT*************")

    var reqObj = this.state; 

    axios.put(`/editbook`, reqObj)
    .then(function(res){
        console.log("RESPONSE", res); 
        return res.data
    })
    .then(function(book){
        console.log("BOOK HAS BEEN UPDATED!"); 
        console.log("id", book.id); 
        hashHistory.push(`/books/${book.id}`);
    })
} 
    

  render (){
    console.log("STATE:", this.state);
    return (
    <div> 
        <h3>Edit Book</h3>
        <hr/>
        <form onSubmit={this.handleSubmit} >
            <div className="form-group">
                <label htmlFor="title" className="col-sm-2 control-label">Book Title</label>
                <div className="col-sm-10">
                    <input name="title" type="text" className="form-control" value={this.state.title || ""} onChange={this.handleChange} />
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="author" className="col-sm-2 control-label">Author Name</label>
                <div className="col-sm-10">
                    <input name="author" type="text" className="form-control" value={this.state.author || ""} onChange={this.handleChange} />
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="url" className="col-sm-2 control-label">Cover Image URL</label>
                <div className="col-sm-10">
                    <input name="url" type="text" className="form-control" value={this.state.url || ""} onChange={this.handleChange} />
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="notes" className="col-sm-2 control-label">Notes</label>
                <div className="col-sm-10">
                    <textarea name="notes" rows="5" type="text" className="form-control" value={this.state.notes || ""} onChange={this.handleChange} ></textarea>
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
                    <select name="starred" value={this.state.starred || "yes"} onChange={this.handleChange} >
                        <option>yes</option>
                        <option>no</option>
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
