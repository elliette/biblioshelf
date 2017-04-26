import React, { Component } from 'react';
import axios from 'axios';
import Month from './Month';

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = { months: [] };
    }

    componentWillMount() {
        axios.get('/api/books')
            .then((res) => {
                return res.data.sort(function(a, b) {
                    return (a.time < b.time) ? 1 : ((b.time < a.time) ? -1 : 0); });
            })
            .then((months) => {
                console.log("results:", months);
                this.setState({ months: months });
            })
    }

    render() {
        return (
            <div>

    {this.state.months.map(function(monthObj){
        return <Month key={monthObj.month+monthObj.year} monthDetails={monthObj} /> 
      })}

    </div>
        )
    }
}
