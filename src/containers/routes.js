import React from 'react'
import {Route, Switch} from 'react-router-dom'

export default class Routes extends React.Component {
  constructor(props){
    super(props)
  }

  render() {
    return(
      <div>
      <Switch>
        Your routes go here
      </Switch>
    </div>
    )
  }
}
