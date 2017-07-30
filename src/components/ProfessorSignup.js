import React from 'react'
import {Redirect} from 'react-router-dom'

export default class ProfessorSignup extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      shouldRedirect: false,
      url: "",
      name: "",
      course: "",
    }
  }


  redirect(e) {
    e.preventDefault()
    let nameArr = this.state.name.split(" ")
    let name = nameArr[0];
    let course = this.state.course.replace(/\s/g, '');
    let url = name + course
    this.setState({
      shouldRedirect: true,
      url: url
    })
  }

  updateName(e) {
    this.setState({
      name: e.target.value
    })
  }

  updateCourse(e) {
    this.setState({
      course: e.target.value
    })
  }

  render() {
    return(
      <div className="row">
        {this.state.shouldRedirect ? <Redirect to={"/professor/"+this.state.url}/> : ""}
        <br/><br/><br/>
        <div className="card-row-1 card-panel col s6 offset-s3">
          <h1>Create a new Professor Profile</h1>
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
                  <input id="coure" type="text" className="validate" onChange={(e)=> this.updateCourse(e)}/>
                  <label htmlFor="coure">Course Name</label>
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
