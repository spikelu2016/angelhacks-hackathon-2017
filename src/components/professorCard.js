import React from 'react'
import {Redirect} from 'react-router-dom'

export default class ProfessorCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      shouldRedirect: false
    }
  }

  redirectToProfessor() {
    this.setState({
      shouldRedirect: true,
    })
  }

  render() {
    return (
      <div onClick={() => this.redirectToProfessor()}>
        {this.state.shouldRedirect ? <Redirect to="/professorsignup"/> : ""}
        <div className="card-row-1 card-panel card-panel-login hoverable">
      <div className="card-image">
        <img id="doc-pic" src="https://d30y9cdsu7xlg0.cloudfront.net/png/44224-200.png"/>
      </div>
      <div className="card-content card-content-doc">
        <h4>Professor</h4>
      </div>
    </div>
      </div>
    )
  }
}
