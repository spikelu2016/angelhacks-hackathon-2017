import React from 'react'
import Question from '../components/question'
import axios from 'axios'
import $ from 'jquery'

export default class ProfessorQuestionsContainer extends React.Component {
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

  render() {
    return(

<div>
  <nav className="main-menu" id="nav">
    <a href="#" className="untarget"><i className="large material-icons center ">keyboard_arrow_left</i></a>
    <ul>
      {this.props.questionsArr.map((question, i) => <Question key={i} index={i} showName={true} question={question.question} username={question.username}/>)}
      <li><span id="anchor"></span></li>
</ul>
</nav>
</div>
    )
  }
}
