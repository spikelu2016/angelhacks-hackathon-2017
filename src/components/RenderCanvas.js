import React from 'react'

export default class RenderCanvas extends React.Component {
  constructor(props) {
    super(props)

  }

  componentDidMount() {
    var self = this;
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    ctx.lineWidth = '1';

    //setup socket connections
    self.props.socket.on('startingCoordinates', (data)=> {
      startDraw(data)
    })

    self.props.socket.on('Coordinates', (data)=> {
      console.log('It was also called on teh client: ', data)
      draw(data)
    })

    function startDraw(point) {
      ctx.beginPath();
      ctx.moveTo(point.x, point.y);
    }

    function draw(point) {
      ctx.lineTo(point.x, point.y);
      ctx.stroke();
    }

  }

  render() {
    return(
      <div>
        <canvas id="canvas"></canvas>
      </div>
    )
  }
}
