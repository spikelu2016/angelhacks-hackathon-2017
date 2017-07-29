import React from 'react'
import {Redirect} from 'react-router-dom'

export default class StudentCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      shouldRedirect: false
    }
  }

  redirectToStudent() {
    this.setState({
      shouldRedirect: true,
    })
  }

  render() {
    return (
      <div onClick={() => this.redirectToStudent()}>
        {this.state.shouldRedirect ? <Redirect to="/student"/> : ""}
        <div className="card-row-1 student-card card-panel-login card-panel  hoverable">
      <div className="card-image">
        <img id="doc-pic" src="https://d30y9cdsu7xlg0.cloudfront.net/png/35778-200.png"/>
      </div>
      <div className="card-content card-content-doc">
        <h4>Student</h4>
      </div>
    </div>
      </div>
    )
  }
}
