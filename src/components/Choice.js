import React from 'react'
import { choicebutton } from './quizStyles'


export default function Choice({ choice, input, red, onClick}) {

  let style = choicebutton

    if (choice === input) {
      if (red) {
        style = {...style, backgroundColor: 'red'}
      }
      else {
        style = {...style, backgroundColor: 'chartreuse'}
      }
    }


  return (
    <button style={style} onClick={onClick}>{choice}</button>
  )

}
