import React from 'react'

export default class Question extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <li className="liBorder">
        <span className="nav-text">{this.props.index+1}) {this.props.question}</span>
      </li>
    )
  }
}
