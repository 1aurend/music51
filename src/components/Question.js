import React from 'react'
import { questionh2 } from './quizStyles'


export default function Question(props) {

  return (
    <>
      <h2 style={questionh2}>{props.question}</h2>
    </>
  )

}
