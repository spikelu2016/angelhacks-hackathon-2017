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
      startDraw(transformData(data))
    })

    self.props.socket.on('Coordinates', (data)=> {
      console.log('It was also called on teh client: ', data)
      draw(transformData(data))
    })

    self.props.socket.on('endingCoordinate', ()=> {
      close()
    })

    function transformData(point) {
      const newX = point.x;
      const newY = point.y;
      const newPoint = {
        x: newX,
        y: newY
      }
      return newPoint
    }

    function startDraw(point) {
      ctx.beginPath();
      ctx.moveTo(point.x, point.y);
    }

    function draw(point) {
      ctx.lineTo(point.x, point.y);
      ctx.stroke();
    }

    function close () {
      ctx.closePath()
    }
  }

  render() {
    return(
      <div>
        <canvas id="canvas" className="canvasScreen"></canvas>
      </div>
    )
  }
}
