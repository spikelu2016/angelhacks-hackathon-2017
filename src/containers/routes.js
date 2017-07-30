import React from 'react'
import {Route, Switch} from 'react-router-dom'
import ProfessorContainer from './professorContainer'
import StudentContainer from './studentContainer'
import LoginContainer from './loginContainer'

export default class Routes extends React.Component {
  constructor(props){
    super(props)
  }

  render() {
    return(
      <div>
        <Switch>
              <Route path="/" exact={true} component={LoginContainer}/>
              <Route path="/professor" component={ProfessorContainer}/>
              <Route path="/student" component={StudentContainer}/>
        </Switch>
    </div>
    )
  }
}
