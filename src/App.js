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
          <h1>Pomodoro Clock</h1>
          <h2>Passed all 29 tests!</h2>
        </header>

        <PomodoroClock />

        <Footer/>

      </React.Fragment>
    );
  }
}

export default App;
