import React from 'react'
import StudentCard from '../components/studentCard'
import ProfessorCard from '../components/professorCard'
import {Link, Redirect} from 'react-router-dom'

export default class LoginContainer extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div>
        <br/><br/><br/>
        <h1>Select your category:</h1>
        <StudentCard />
        <div className="spacer">.</div>
        <ProfessorCard />
      </div>
    )
  }
}
