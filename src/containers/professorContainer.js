import React from 'react';
import ProfessorNodeContainer from './professorNodeContainer';
import io from 'socket.io-client'


export default class ProfessorContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      professor: {
        username: '',
        email: ''
      },
      class: [
        {
          description: 'Introduction to HTML',
          type: 'TOPIC', // type is either 'TOPIC' or 'SUBTOPIC'
          upvotes: 5,
          downvotes: 4,
          questions: [
          ]
        },
        {
          description: 'Introduction to Javascript',
          type: 'TOPIC', // type is either 'TOPIC' or 'SUBTOPIC'
          upvotes: 5,
          downvotes: 4,
          questions: [
          ]
        },
        {
          description: 'Introduction to React',
          type: 'TOPIC', // type is either 'TOPIC' or 'SUBTOPIC'
          upvotes: 5,
          downvotes: 4,
          questions: [
          ]
        },
      ]
    };
    //SOCKETS SETUP
    this.socket = io('http://localhost:3000');

    this.socket.on('userJoined', () => {
      console.log('User joined')
    })

    this.socket.on('userLeft', () => {
      console.log('the user left')
    })

  }

  render() {
    return (
      <div>
        <ProfessorNodeContainer socket={this.socket} class={this.state.class}/>
      </div>
    );
  }
}
