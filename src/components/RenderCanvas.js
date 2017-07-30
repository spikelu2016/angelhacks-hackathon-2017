import React from 'react'

export default class RenderCanvas extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div>
        <canvas id="canvas"></canvas>
      </div>
    )
  }
}
