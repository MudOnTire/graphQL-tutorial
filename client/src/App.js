import React, { Component } from 'react';
import './theme.css';
import './App.css';
import logo from './spacex-logo-light.png'

class App extends Component {
  render() {
    return (
      <div className="App">
          <img src={logo} id="logo" />
      </div>
    );
  }
}

export default App;
