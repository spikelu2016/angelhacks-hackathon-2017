import React from 'react'
import {Route, Switch} from 'react-router-dom'
import ProfessorContainer from './professorContainer'
import StudentContainer from './studentContainer'
import LoginContainer from './loginContainer'
import ProfessorSignup from '../components/ProfessorSignup'
import StudentSignup from '../components/StudentSignup'
import EnterCode from '../components/EnterCode'

export default class Routes extends React.Component {
  constructor(props){
    super(props)
  }

  render() {
    return(
      <div>
        <Switch>
              <Route path="/studentCode" component={EnterCode}/>
              <Route path="/studentSignup" component={StudentSignup}/>
              <Route path="/professorsignup" component={ProfessorSignup}/>
              <Route path="/" exact={true} component={LoginContainer}/>
              <Route path="/professor/:shareableCode" exact={true} component={ProfessorContainer}/>
              <Route path="/student" exact={true} component={StudentContainer}/>
        </Switch>
    </div>
    )
  }
}
