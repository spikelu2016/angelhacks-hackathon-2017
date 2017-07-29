import React from 'react'

export default class Question extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <li>
        <a href="">
          {console.log(this.props)}
          <span className="nav-text">{this.props.question}</span>
        </a>
      </li>
    )
  }
}
