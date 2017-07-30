import React from 'react'
import {Route, Switch} from 'react-router-dom'
import ProfessorContainer from './professorContainer'
import StudentContainer from './studentContainer'
import LoginContainer from './loginContainer'
import StudentSignup from '../components/studentSignup'
import ProfessorSignup from '../components/professorSignup'
import EnterCode from '../components/enterCode'

export default class Routes extends React.Component {
  constructor(props){
    super(props)
  }

  render() {
    return(
      <div>
        <Switch>
              <Route path='/student/enterCode' component={EnterCode}/>
              <Route path="/" exact={true} component={LoginContainer}/>
              <Route path="/student/signup" component={StudentSignup}/>
              <Route path="/professor/signup" component={ProfessorSignup}/>
              <Route path="/professor" exact={true} component={ProfessorContainer}/>
              <Route path="/student" exact={true} component={StudentContainer}/>
        </Switch>
    </div>
    )
  }
}
