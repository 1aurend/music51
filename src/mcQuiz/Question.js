import React from 'react'
import { questionh2 } from './quizStyles'


function Question(props) {

  return (
    <React.Fragment>
      <h2 style={questionh2}>{props.question}</h2>
    </React.Fragment>
  )

}

export default Question
