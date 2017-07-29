import React from 'react'
import StudentQuestionsContainer from './studentQuestionsContainer'
import axios from 'axios'

export default class StudentNodeContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      allQuestions: {},
      questionsArr: [],
      topic: "",
      nodeId: ""
    }

    this.props.socket.on('newQuestionAdded', (data) => {
      const originalAllQuestions = this.state.allQuestions;
      originalAllQuestions[data.topic].push(data)
      this.setState({
        allQuestions: originalAllQuestions
      })
    })
  }

  componentDidMount() {
    console.log('allnooooooooodes:', this.props.allNodes);
    const originalAllQuestions = this.state.allQuestions;
    for(let i = 0;  i < this.props.allNodes.length; i++){
      originalAllQuestions[this.props.allNodes[i].description] = this.props.allNodes[i].questions;
    }
    this.setState({
      allQuestions: originalAllQuestions
    })
    console.log('allQuestions', this.state.allQuestions);
  }

  nodeClicked(topic, index, nodeId) {
    const questionsArr = this.props.allNodes[index].questions;
    this.setState({
      questionsArr: questionsArr,
      topic: topic,
      nodeId: nodeId
    })
  }

  render() {
    return(
      <div>
        <div className="node-container">
          <div className="card-row-1 student-card card-panel  white  card-panel-node">
        {this.props.allNodes.map((item, index) => (
          <div><a href="#nav" key={index}  onClick={() => this.nodeClicked(item.description, index, item._id)}>{item.description}</a></div>))}
        </div>
      </div>
        <StudentQuestionsContainer className="StudentQuestionsContainer" socket={this.props.socket} questionsArr={this.state.questionsArr} topic={this.state.topic} nodeId={this.state.nodeId}/>
        <div className="canvas-container">
                  this is the canvas container
                </div>
      </div>
    )
  }
}
