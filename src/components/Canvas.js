import React from 'react'

export default class Canvas extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount(){
    var myBoard = new DrawingBoard.Board('drawingboard');
  }

  render() {
    return (
      <span id="drawingboard"></span>

    )
  }
}
