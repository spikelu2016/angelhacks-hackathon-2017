import React from 'react'

export default class Question extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <li className="liBorder">
        <span className="nav-text">{this.props.username}: {this.props.question}</span>
      </li>
    )
  }
}
