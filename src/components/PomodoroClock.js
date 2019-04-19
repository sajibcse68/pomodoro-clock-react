import React from "react";
import moment from "moment";
import "moment-timer";
import ProgressRing from "./ProgressRing";
import { PomodoroSessions } from "./PomodoroSessions";

export class PomodoroClock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sec: 0,
      cntSec: 0,
      min: 25,
      cntMin: 0,
      breakLen: 5,
      sessionLen: 25,
      sessionType: 'Session', // Session / Break
      clockStatus: false,
      percent: 0 // for animation
    }
  }

  beepEl = () => document.getElementById('beep');

  otherSounds = () => {
    const woosh = new Audio(
      'https://res.cloudinary.com/dixehwylu/video/upload/v1537718104/PomodoroClock/sounds/Woosh-Mark_DiAngelo-4778593.mp3'
    )
    const beep2 = new Audio(
      'https://res.cloudinary.com/dixehwylu/video/upload/v1537719693/PomodoroClock/sounds/Checkout_Scanner_Beep-SoundBible.com-593325210.mp3'
    )
    return { woosh, beep2 };
  }

  formatedTimeLeft = () => {
    const min = this.state.min < 10
      ? `0${this.state.min}`
      : this.state.min;

    const sec = this.state.sec < 10
      ? `0${this.state.sec}`
      : this.state.sec;

      return `${min}:${sec}`;
  }

  // reset the clock
  handleReset = () => {
    if (this.timeID) { this.timeID.stop() } /*{clearInterval(this.timeID)}*/
    this.setState(prevState => ({
      ...prevState,
      sec: 0,
      cntSec: 0,
      min: 25,
      breakLen: 5,
      sessionLen: 25,
      sessionType: 'Session',
      clockStatus: false,
      percent: 0
    }))
    this.beepEl().pause()
    this.beepEl().currentTime = 0
    this.otherSounds().woosh.play()
  }

  // reset seconds
  resetSeconds = (property, session) => {
    this.setState({
      sec: 0,
      cntSec: 0
    });

    if (this.state.sessionType === session) {
      this.setState((oldState) => ({
        min: oldState[property]
      }))
    }
  }

  // increment state property by one
  incrementByOne = (property, session) => {
    if(this.state[property] < 60) {
      this.setState(oldState => ({
        [property]: oldState[property] + 1,
      }))

      this.resetSeconds(property, session);
      this.otherSounds().woosh.play();
    }
  }

  // decrement state property by one
  decrementByOne = (property, session) => {
    if(this.state[property] > 1) {
      this.setState(oldState => ({
        [property]: oldState[property] - 1,
      }))

      this.resetSeconds(property, session);
      this.otherSounds().woosh.play();
    }
  }

  setSessionTypes = () => {
    if (this.state.sec === 1 && this.state.min === 0) {
      new moment.duration(999).timer({ start: true }, () => {
        this.beepEl().play();

        this.setState(prevState => ({
          sessionType: prevState.sessionType === 'Session'
            ? 'Break' : 'Session',
          percent: 100
        }))
      })
      new moment.duration(1995).timer({ start: true }, () => {
        this.setState(prevState => ({
          min: prevState.sessionType === 'Session'
            ? prevState.sessionLen : prevState.breakLen,
          cntSec: 0,
          percent: 0
        }))
      })
    }
  }

  calculatePercent = () => {
    const {
      percent,
      cntSec,
      breakLen,
      sessionLen,
      sessionType
    } = this.state

    const progressUpdate = sessionType === 'Session'
      ? 100 / (sessionLen * 60) : 100 / (breakLen * 60)
    if (cntSec > 0 && percent < 99) {
      this.setState(prevState => ({
        percent: parseFloat((prevState.percent + progressUpdate).toFixed(2))
      }))
    }
  }

  timeIDSettings = () => {
    this.calculatePercent();

    this.setState(prevState => ({
      sec: prevState.sec <= 0 ? 59 : prevState.sec - 1,
      cntSec: prevState.cntSec + 1
    }))

    if (this.state.sec === 59 && this.state.min > 0) {
      this.setState((prevState) => ({
        min: prevState.min - 1
      }))
    }

    this.setSessionTypes()
  }

  startTimer = () => {
    debugger;
    this.setState(() => ({ clockStatus: true }));
    this.timeID = moment.duration(1000).timer({ loop: true }, this.timeIDSettings)
  }

  stopTimer = () => {
    this.setState(() => ({ clockStatus: false }));
    this.timeID.stop();
    this.beepEl().load();
  }
  handlePlayStop = () => {
    this.state.clockStatus
      ? this.stopTimer()
      : this.startTimer()

    this.otherSounds().beep2.play();
  }

  render() {
    return (
      <section
        id="pomodoro-clock"
        className={this.min === 0 && this.sec === 0 ? 'sound-animation' : ''}>
        <audio
          id="beep"
          src="https://res.cloudinary.com/dixehwylu/video/upload/v1536880047/PomodoroClock/sounds/alarm_alarm.mp3"
          preload="auto"
        />
        <div id="display-timer-container">
          <h3 id="timer-label">{this.state.sessionType}</h3>
          <a type="button"
            onClick={this.handlePlayStop}
            id="start_stop"
          >
            <ProgressRing
              state={this.state}
              timeLeft={this.formatedTimeLeft()} />
          </a>
        </div>
        <PomodoroSessions
          state={this.state}
          increment={this.incrementByOne}
          decrement={this.decrementByOne}
          woosh={this.otherSounds.woosh}
        />
        <button onClick={this.handleReset} id="reset">
          <i className="fas fa-sync-alt"></i> RESET
				</button>
      </section>
    )
  }
}