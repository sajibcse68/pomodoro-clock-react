import React from 'react'

class ProgressRing extends React.Component {
  percent = 0
  circle = () => {
    const el = document.querySelector('.progress-ring__circle')
    const radius = el.r.baseVal.value
    const circumference = radius * 2 * Math.PI
    return { el, radius, circumference }
  }
  circleStyle = (circumference) => {
    const style = this.circle().el.style
    style.strokeDasharray = `${circumference} ${circumference}`
    style.strokeDashoffset = `${circumference}`
    style.stroke = this.props.state.percent > 0 ? '#F06E6E' : 'transparent'
    style.transition = `all 1s`
  }
  setProgress = (percent) => {
    const circumference = this.circle().circumference
    const offset = circumference - percent / 100 * circumference
    this.circle().el.style.strokeDashoffset = offset
  }
  circleProgressHandle = () => {
    this.circleStyle(this.circle().circumference)
    const percent = this.props.state.percent
    this.circleStyle(this.circle().circumference)
    this.setProgress(percent)
  }
  componentDidUpdate = () => {
    this.circleProgressHandle()
  }
  render() {
    return (
      <div id="progress-ring">
        <div id="time-left" className="time-left" hidden>{this.props.timeLeft}</div>
        <svg
          className="progress-ring"
          height="172"
          width="172">
          <text
            x="40"
            y="95"
            fill="white"
            id="time-left-main"
            className="time-left"
          >{this.props.timeLeft}
          </text>
          <text
            x="66"
            y="130"
            fill="white"
            className="start-pause-message"
          >{this.props.state.clockStatus ? 'PAUSE' : 'START'}
          </text>
          <circle
            className="progress-ring__circle_layer"
            strokeWidth="7"
            fill="transparent"
            r='78'
            cx="86"
            cy="86" />
          <circle
            className="progress-ring__circle"
            strokeWidth="4"
            fill="transparent"
            r='78'
            cx="86"
            cy="86" />
        </svg>
      </div>
    )
  }
}

export { ProgressRing as default }