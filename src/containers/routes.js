import React from 'react'
import {Route, Switch} from 'react-router-dom'
import ProfessorContainer from './professorContainer'
import StudentContainer from './studentContainer'
import LoginContainer from './loginContainer'

import Example from '../components/VoiceRecorder'
import SketchPad from '../components/canvas'


export default class Routes extends React.Component {
  constructor(props){
    super(props)
  }

  render() {
    return(
      <div>
        <Switch>
              <Route path="/" exact={true} component={SketchPad}/>
              <Route path="/professor" component={ProfessorContainer}/>
              <Route path="/student" component={StudentContainer}/>
        </Switch>
    </div>
    )
  }
}
