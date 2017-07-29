import React from 'react'
import StudentNodeContainer from './studentNodeContainer'
import io from 'socket.io-client'
import axios from 'axios'


export default class StudentContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      allNodes: [],
      hasLoaded: false
    }
    //SOCKET SETUP
      this.socket = io('http://localhost:3000');

      this.socket.on('userJoined', () => {
        console.log('User joined')
      })

      this.socket.on('userLeft', () => {
        console.log('the user left')
      })
  }

  componentDidMount() {
    // TODO: make an axios call to backend to popular the allQuestions
    axios.post('http://localhost:3000/getAllQuestions', {
    })
    .then((resp) => {
      this.setState({
        allNodes: resp.data.allNodes,
        hasLoaded: true
      })
      }
    );
  }

  //do socket connection in this class then pass it down

  render() {
    return (
      <div>
        {this.state.hasLoaded ? <StudentNodeContainer socket={this.socket} allNodes={this.state.allNodes}/> : ""}
      </div>
    );
  }
}
