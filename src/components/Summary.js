import React, { Component } from 'react'
import axios from 'axios';

class Summary extends Component {

  state = {
    events: [],
    people: []
  }

  componentDidMount = () => {
    axios({
      method: 'GET',
      url: 'http://localhost:8000/api/events'
    }).then(resp => {
      this.setState(() => ({
        events: resp.data
      }));
    });

    axios({
      method: 'GET',
      url: 'http://localhost:8000/api/people'
    }).then(resp => {
      this.setState(() => ({
        people: resp.data
      }));
    });

  }

  render = () => {
    const { events, people } = this.state;

    if (!events && !people) {
      return (
        <p>Loading...</p>
      )
    }

    return (
      <div>
        Here is your summary
        <button onClick={() => console.log(this.state)}>State</button>
        {
          events.map(event => {
            return <p>{event.eventName}</p>
          })
        }

        {
          people.map(person => {
            return <p>{person.name}</p>
              })
        }
        </div>
    )}}
    export default Summary;