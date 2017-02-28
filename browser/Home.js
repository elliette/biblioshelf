import React, { Component } from 'react';
import axios from 'axios';
import Month from './Month'; 
import WelcomeMessage from './WelcomeMessage'; 

export default class Home extends Component {

constructor (props) {
    super(props);
    this.state = {
      months: [], 
      isEmpty: false
    };
  }

  componentWillMount () {
    
    axios.get('/api/books')
    .then((res) => {
      console.log("RESPONSE", res)
      return res.data
    })
    .then((books) => {
      if (!books.length){
        this.setState({isEmpty: true})
      } else {
        axios.get('/api/months')
        .then((res) => {
          return res.data.sort(function(a,b) {return (a.time < b.time) ? 1 : ((b.time < a.time) ? -1 : 0);} );
        }) 
        .then((months) => {
          console.log("results:", months); 
          this.setState({months: months}); 
      })
    }
    })
  }
   
   render () {
    return (
    	<div>

    {this.state.isEmpty ? <WelcomeMessage /> : this.state.months.map(function(monthObj){
        return <Month key={monthObj.month+monthObj.year} monthDetails={monthObj} /> 
      })}

    </div>
    )
	}
} 