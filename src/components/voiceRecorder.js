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

  onStop(recordedBlob) {
    console.log(recordedBlob.blob);
    axios.put('http://localhost:3000/saveAudioFiles', {blob: recordedBlob})
    .then((resp) => {
      console.log('got to the then');
    });
    // console.log('recordedBlob is: ', recordedBlob.blob);
    // console.log('type of recordedblob is:', typeof recordedBlob);
    // const a = document.createElement('a');
    // a.style = 'display: none';
    // document.body.appendChild(a);
    // var url = recordedBlob.blobURL;
    // a.href = url;
    // a.download = 'hohohohoho.wav';
    // a.click();
    // window.URL.revokeObjectURL(url);
    // document.body.removeChild(a);
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
