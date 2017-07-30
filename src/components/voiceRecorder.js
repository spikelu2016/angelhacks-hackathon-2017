import { ReactMic } from 'react-mic';
import React from 'react'
import axios from 'axios'

export default class VoiceRecorder extends React.Component {
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

  componentDidMount() {
    this.startRecording()
  }

  onStop(recordedBlob) {
    console.log(recordedBlob.blob);
    axios.put('http://localhost:3000/saveAudioFiles', {blob: recordedBlob})
    .then((resp) => {
      console.log('got to the then');
    });

  }


  render() {
    return (
      <div>
        <ReactMic id="mic"
          record={this.state.record}
          className="sound-wave"
          onStop={this.onStop}
          strokeColor="#000000"
          backgroundColor="#e8fcff"/>
        {/* <button className="btn" onClick={() => this.startRecording()} type="button">Start</button> */}
        {/* <button className="btn" onClick={() => this.stopRecording()} type="button">Stop</button> */}
      </div>
    );
  }
}
