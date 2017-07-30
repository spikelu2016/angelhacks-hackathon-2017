import React from 'react'
import {Redirect} from 'react-router-dom'

export default class EnterCode extends React.Component {
  constructor(props){
    super(props)
    this.state={
      shouldRedirect: false
    }
  }

  redirect(e) {
      e.preventDefault()
      this.setState({
        shouldRedirect: true,
      })
  }

  render() {
    return(
      <div className="row">
        {this.state.shouldRedirect ? <Redirect to={"/student"}/> : ""}
        <br/><br/><br/>
        <div className="card-row-1 card-panel col s4 offset-s4 aa">
          <h1 id="aa">Please enter your access code</h1>
          <div className="row">
            <form className="col s12">
              <div className="row">
                <div className="input-field col s10 offset-s1">
                  <input id="name" type="text" className="validate"/>
                  <label htmlFor="name">Access Code</label>
                </div>
              </div>
            </form>
          </div>
          <div className="row">
            <form className="col s12">
              <div className="row">
                <div className="input-field col s10 offset-s1">
                <div onClick={(e)=> this.redirect(e)} className="btn signup-button">Join</div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
