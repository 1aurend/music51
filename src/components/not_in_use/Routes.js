import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Start from './Start.js'
import QuizContainer from './QuizContainer.js'


function Routes() {

  return (
    <Switch>
      <Route path='/' exact component={Start}/>
      <Route path='/quiz' render={props => <QuizContainer {...props} />} />
    </Switch>
  )
}

export default Routes
