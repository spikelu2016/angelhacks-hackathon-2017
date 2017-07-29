import React from 'react'

export default class Question extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div>
        The question is: {this.props.question}
      </div>
    )
  }
}
