import React from 'react'
import {Redirect} from 'react-router-dom'

export default class StudentSignup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      shouldRedirect: false,
    }
  }

  redirect(e) {
    e.preventDefault()
    this.setState({
      shouldRedirect: true,
    })
  }

  updateName(e) {
    this.setState({
      name: e.target.value
    })
  }

  render() {
    return(
      <div className="row">
        {this.state.shouldRedirect ? <Redirect to={"/student"}/> : ""}
        <br/><br/><br/>
        <div className="card-row-1 card-panel col s6 offset-s3">
          <h1>Create a new Student Profile</h1>
          <div className="row">
            <form className="col s12">
              <div className="row">
                <div className="input-field col s10 offset-s1">
                  <input id="name" type="text" className="validate" onChange={(e)=> this.updateName(e)}/>
                  <label htmlFor="name">Full Name</label>
                </div>
              </div>
            </form>
          </div>
          <div className="row">
            <form className="col s12">
              <div className="row">
                <div className="input-field col s10 offset-s1">
                  <input id="email" type="text" className="validate"/>
                  <label htmlFor="email">Access Code</label>
                </div>
              </div>
            </form>
          </div>
          <div className="row">
            <form className="col s12">
              <div className="row">
                <div className="input-field col s10 offset-s1">
                <div onClick={(e)=> this.redirect(e)} className="btn signup-button">Create</div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
