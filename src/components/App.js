import React, { Component } from "react";
import ReactDOM from "react-dom";
import LocksList from "./LocksList";
import "../styles/index.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <LocksList />
      </div>
    );
  }
}

export default App;
