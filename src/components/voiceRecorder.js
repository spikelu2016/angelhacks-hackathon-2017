import { ReactMic } from 'react-mic';
import React from 'react'

export default class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      record: false
    }

  }

  startRecording () {
    this.setState({
      record: true
    });
    console.log(this.state.record)
  }

  stopRecording () {
    this.setState({
      record: false
    });
  }

  onStop(recordedBlob) {
    console.log('recordedBlob is: ', recordedBlob);
  }

  render() {
    return (
      <div>
        <ReactMic
          record={this.state.record}
          className="sound-wave"
          onStop={this.onStop}
          strokeColor="#000000"
          backgroundColor="#FF4081" />
        <button onClick={() => this.startRecording()} type="button">Start</button>
        <button onClick={() => this.stopRecording()} type="button">Stop</button>
      </div>
    );
  }
}
