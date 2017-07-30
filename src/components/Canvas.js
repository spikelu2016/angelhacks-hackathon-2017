import React from 'react'

export default class Canvas extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount(){
    var self = this;
    var myBoard = new DrawingBoard.Board('drawingboard');
    myBoard.ev.bind('board:startDrawing', function(e){startLogging(true,e)});
    myBoard.ev.bind('board:stopDrawing', function(e){startLogging(false,e)});

    function startLogging(bool,e){
      if(bool){
        sendStartingCordinate(e)
        myBoard.ev.bind('board:drawing', sendCordinates);
      } else {
        sendEndingCordinates(e)
        myBoard.ev.unbind('board:drawing', sendCordinates);
      }
    }

    function sendEndingCordinates(e) {
      self.props.socket.emit('endingCoordinate')
    }

    // myBoard.ev.bind('board:stopDrawing', function(){startLogging(false)});
    function sendStartingCordinate(e) {
      self.props.socket.emit('startingCoordinates', e.coords)
    }

    function sendCordinates(e) {
      self.props.socket.emit('Coordinates', e.coords)
    }


  }
  render() {
    return (
      <span id="drawingboard" className="canvasScreen"></span>
    )
  }
}
