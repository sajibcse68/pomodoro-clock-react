import React, { Component } from 'react';
import './App.css';
import { PomodoroClock } from "./components/PomodoroClock";
import { Footer } from "./components/Footer";
import "./styles/styles.sass";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <header>
          <h1>Promodoro Clock</h1>
        </header>

        <PomodoroClock />

        <Footer/>

      </React.Fragment>
    );
  }
}

export default App;
