import React from 'react'
import QuizContainer from './components/QuizContainer'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"
import "shards-ui/dist/css/shards.min.css"



function App() {
//I've chosen to leave App as a router even though no routing is really happening now in case it makes sense to have multiple routes later, e.g. for login or different types of quizzes, etc.
    return (
      <Router>
        <Route path='/' exact component={QuizContainer} />
      </Router>
    )

  }


export default App
