import React, { Component } from 'react';
import './App.css';
import Main from './components/Main';
import Header from './components/Header';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="container">
          <Main />
        </div>
      </div>
    );
  }
}

export default App;
