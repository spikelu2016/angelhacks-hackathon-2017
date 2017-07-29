import React from 'react'
import ProfessorQuestionsContainer from './professorQuestionsContainer'
import axios from 'axios'

export default class ProfessorNodeContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      allQuestions: {
        "t1": [],
        "t2": [],
        "t3": [],
      },
      questionsArr: [],
      topic: "",
    }

    this.props.socket.on('newQuestionAdded', (data) => {
      const originalAllQuestions = this.state.allQuestions
      originalAllQuestions[data.topic].push(data)
      this.setState({
        allQuestions: originalAllQuestions
      })
    })
  }

  componentDidMount() {
    this.setState({
      questionsArr: this.props.class[0].questions,
      topic: this.props.class[0].description
    })
    // TODO: make an axios call to backend to popular the allQuestions
    axios.post('http://localhost:3000/getAllQuestions', {
    })
    .then((resp) => {
      const allQuestions = resp.data.questions
      const originalAllQuestions = this.state.allQuestions
      for(var i = 0; i < allQuestions.length; i++){
        for(var topic in originalAllQuestions){
          if(allQuestions[i].topic === topic) {
            originalAllQuestions[topic].push(allQuestions[i]);
          }
        }
      }
      this.setState({
        allQuestions: originalAllQuestions
      })
    })
  }

  nodeClicked(topic, index) {
    const questionsArr = this.props.class[index].questions;
    this.setState({
      questionsArr: questionsArr,
      topic: topic
    })
  }

  render() {
    return(
      <div>
        {this.state.class.map((item, index) => (<div onClick={() => this.nodeClicked(item.description, index)}>{item.description}</div>))}
        <ProfessorQuestionsContainer socket={this.props.socket} questionsArr={this.state.questionsArr} topic={this.state.topic}/>
      </div>
    )
  }
}
