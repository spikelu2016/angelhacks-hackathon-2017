import React from 'react'
import Question from '../components/question'

export default class ProfessorQuestionsContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      newQuestion: ""
    }
  }

  render() {
    return(
      <div>
        <div>
          {this.props.questionsArr.map((question, i) => <Question key={i} question={question.question}/>)}
        </div>
      </div>
    )
  }
}
