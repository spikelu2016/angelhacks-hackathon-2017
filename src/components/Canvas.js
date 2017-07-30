import React from 'react'

export default class Canvas extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount(){
    var self = this;
    var isActive = false;
    var myBoard = new DrawingBoard.Board('drawingboard');

    setTimeout(function(){
      myBoard.ev.bind('board:startDrawing', function(e){draw(e.coords.x,e.coords.y,'startdrawing')});
      myBoard.ev.bind('board:drawing', function(e){draw(e.coords.x,e.coords.y,'drawing')});
      myBoard.ev.bind('board:stopDrawing', function(e){draw(e.coords.x,e.coords.y,'stopdrawing')});
      console.log('finished binding');
    }, 5000);

    // myBoard.ev.bind('board:startDrawing', function(e){draw(e.coords.x,e.coords.y,'startdrawing')});
    // myBoard.ev.bind('board:drawing', function(e){draw(e.coords.x,e.coords.y,'drawing')});
    // myBoard.ev.bind('board:stopDrawing', function(e){draw(e.coords.x,e.coords.y,'stopdrawing')});

    function draw(x, y, type){
      console.log('emited', type)
      self.props.socket.emit(type, {x,y});
    }
  }
  render() {
    return (
      <span id="drawingboard" className="canvasScreen"></span>
    )
  }
}
