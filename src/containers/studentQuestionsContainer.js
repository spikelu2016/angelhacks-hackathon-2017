import React from 'react'
import Question from '../components/question'
import axios from 'axios'

export default class StudentQuestionsContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      newQuestion: ""
    }
  }

  updateQuestion(e) {
    this.setState({
      newQuestion: e.target.value
    })
  }

  askQuestionClicked(e) {
    e.preventDefault();
    const nodeId = this.props.nodeId;
    const username = 'spike';
    const topic = this.props.topic;
    const question = this.state.newQuestion;
    const questionObj = {username: username, topic: topic, question: question};
    axios.post('http://localhost:3000/addQuestion', {questionObj: questionObj, nodeId: nodeId})
    .then((resp) => {
      console.log('got to the then');
    });
    this.props.socket.emit('newQuestion', {username: username, topic: topic, question: question})
  }

  render() {
    return(
      <div>
      <div>
        {this.props.questionsArr.map((question, i) => <Question key={i} question={question.question}/>)}
      </div>
      <div className="row">
    <form className="col s12">
      <div className="row">
        <div className="col s12">
          <div className="input-field inline">
            <input id="questionInput" type="text" onChange={(e) => this.updateQuestion(e)}/>
            <label htmlFor="questionInput" data-error="wrong" data-success="right">Ask a question...</label>
          </div>
          <br/>
          <a  onClick={(e) => this.askQuestionClicked(e)} className="waves-effect waves-light btn">Ask!</a>
        </div>
      </div>
    </form>
  </div>
</div>
    )
  }
}
