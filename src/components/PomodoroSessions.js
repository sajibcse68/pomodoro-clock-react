import React from 'react'

export const PomodoroSessions = (props) => (
  <div id="sessions">
    <div className="sessions-container session-container">
      <p id="session-label" className="sessions-name">Session Length</p>
      <span
        id="session-length"
        className="length-display"
      >{props.state.sessionLen}
      </span>
      <div className="sessions-btn-container">
        <button
          id="session-increment"
          href="#"
          onClick={() => props.increment('sessionLen', 'Session')}
          disabled={props.state.clockStatus}
          className="in-de-crementorsBtn"
        >
          <i className="fas fa-chevron-up"></i>
        </button>
        <button
          id="session-decrement"
          href="#"
          onClick={() => props.decrement('sessionLen', 'Session')}
          disabled={props.state.clockStatus}
          className="in-de-crementorsBtn"
        >
          <i className="fas fa-chevron-down"></i>
        </button>
      </div>

    </div>
    <div className="sessions-container break-container">
      <p id="break-label" className="sessions-name">Break Length</p>
      <span
        id="break-length"
        className="length-display"
      >{props.state.breakLen}
      </span>
      <div className="sessions-btn-container">
        <button
          id="break-increment"
          href="#"
          onClick={() => props.increment('breakLen', 'Break')}
          disabled={props.state.clockStatus}
          className="in-de-crementorsBtn"
        >
          <i className="fas fa-chevron-up"></i>
        </button>
        <button
          id="break-decrement"
          href="#"
          onClick={() => props.decrement('breakLen', 'Break')}
          disabled={props.state.clockStatus}
          className="in-de-crementorsBtn"
        >
          <i className="fas fa-chevron-down"></i>
        </button>
      </div>

    </div>
  </div>
)
