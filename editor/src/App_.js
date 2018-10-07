import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import EditManagment from './editors'

class App extends Component {
  render() {
    return (
      <div className="App">
        <EditManagment/>
      </div>
    );
  }
}

export default App;
