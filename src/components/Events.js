import React, { Component } from 'react';
import axios from 'axios';
import $ from 'jquery';
import '../App.css';

class Events extends Component {

  state = {
    events: [],
    counter: 0
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
  }

  swipe = (direction) => {
    let event = $('#event');
    event.removeClass();
    if (direction === 'right') {
      event.addClass('animated slideOutRight');
    } else {
      event.addClass('animated slideOutLeft');
    }
    this.getNewEvent();
  }

  swipeRight = () => this.swipe('right');

  swipeLeft = () => this.swipe('left');

  getNewEvent = () => {
    if (this.state.counter + 1 === this.state.events.length){
      this.props.history.push('/review');
    }
    setTimeout(() => {
      this.setState((prevState) => ({
        counter: this.state.counter + 1
      }));
    }, 700)
    setTimeout(() => {
      $('#event').removeClass()
      $('#event').addClass('animated zoomIn');
    }, 1000)
  }
  
  render = () => {
    const { events, counter } = this.state
    if (events.length === 0) {
      return <p>Loading...</p>
    }
    return (
      <div>
        <div className="container">
          <div id="events" className="has-text-centered">
            <button className="button swipe-button is-danger" onClick={this.swipeLeft}><span role="img">👈</span></button>
            <button className="button swipe-button is-success" onClick={this.swipeRight}><span role="img">👉</span></button>
            <div id="event" className="animated zoomIn">
              <h2 className="is-size-2">
                {events[counter].eventName}
              </h2>
              <img src={events[counter].imageURL} style={{ width: '400px', height: '300px' }} alt={events[counter].eventName} />
              <br />
              <span className="tag is-primary">{events[counter].badgeCount}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Events;