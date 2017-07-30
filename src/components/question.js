import React from 'react'

export default class Question extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <li className="liBorder">
        <div className="card-row-1 card-panel white card-panel-question-posted">
        <span className="nav-text">{this.props.username}: {this.props.question}</span>
      </div>
      </li>
    )
  }
}
