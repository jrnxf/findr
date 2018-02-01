import React, { Component } from 'react';
import axios from 'axios';
import $ from 'jquery';
import './App.css';

class App extends Component {
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

        <section className="hero is-medium is-primary is-bold">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">findr</h1>
              <h2 className="subtitle">swipe <span role="img">👉</span> if <span role="img">😍</span>
                <br />swipe <span role="img">👈</span> if <span role="img">🤮</span></h2>
            </div>
          </div>
        </section>

        <div className="container has-text-centered">

          <form>

            <div className="field">
              <label className="label">Name</label>
              <div className="control has-icons-left has-icons-right">
                <input className="input is-primary" type="text" placeholder="John Doe" />
                <span className="icon is-small is-left">
                  <i className="fas fa-user"></i>
                </span>
                <span className="icon is-small is-right">
                  <i className="fas fa-check"></i>
                </span>
              </div>
            </div>

            <div className="field">
              <label className="label">Email</label>
              <div className="control has-icons-left has-icons-right">
                <input className="input is-primary" type="email" placeholder="email" />
                <span className="icon is-small is-left">
                  <i className="fas fa-envelope"></i>
                </span>
                <span className="icon is-small is-right">
                  <i className="fas fa-exclamation-triangle"></i>
                </span>
              </div>
            </div>

          </form>

          <div id="events">
            <button className="button is-danger" onClick={this.swipeLeft}><span role="img">👈</span></button>
            <button className="button is-success" onClick={this.swipeRight}><span role="img">👉</span></button>
            <div id="event" className="animated zoomIn">
              <h2 className="is-size-2">{events[counter].eventName}</h2>
              <img src={events[counter].imageURL} style={{ width: '400px', height: '300px' }} alt={events[counter].eventName} />
            </div>
          </div>
          
        </div>
      </div>
    );
  }
}

export default App;




// <footer className="footer">
//           <div className="container">
//             <div className="content has-text-centered">
//               <p>
//                 <strong>Code</strong> by
//                 <a href="http://coloradocolby.com">Colby Thomas</a> &amp;
//                 <a href="http://github.com/brennansaul"> Brennan Saul</a>
//               </p>
//             </div>
//           </div>
//         </footer>