import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import EditManagment from './editors'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Corp Site Editor</h1>
        </header>
        <EditManagment/>
      </div>
    );
  }
}

export default App;
