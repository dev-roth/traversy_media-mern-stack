import React, { Component } from 'react';
import AppNavbar from './components/AppNavbar.js'

import 'bootstrap/dist/css/bootstrap.css'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppNavbar />
        <h1>Learn the MERN Stack!</h1>
      </div>
    );
  }
}

export default App;
