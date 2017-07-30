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

    var isActive = false;

    // ctx.beginPath();
    // ctx.moveTo(0,0);
    // ctx.lineTo(1000,1000);
    // ctx.stroke();

    //setup socket connections
    self.props.socket.on('startdrawing', (data)=> {
      console.log('received startdrawing');
      ctx.beginPath();
      ctx.moveTo(data.x, data.y);
      isActive = true;
    })

    self.props.socket.on('drawing', (data)=> {
      if(isActive){
        console.log('received drawing');
        ctx.lineTo(data.x, data.y);
        ctx.stroke();
      }
    })

    self.props.socket.on('stopdrawing', (data)=> {
      console.log('received stopdrawing');
      ctx.closePath();
      isActive = false;
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
        <canvas id="canvas" width="600" height="2000"></canvas>
      </div>
    )
  }
}
