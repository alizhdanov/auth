import React, { Component } from 'react';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import SignOut from './components/SignOut';
import User from './components/User';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <SignIn />
        <SignUp />
        <SignOut />
        <User />
      </div>
    );
  }
}

export default App;
